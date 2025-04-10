const txtName = document.getElementById("Name");  //siempre pones txt para saber que es un variable de texto
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //el primer elemento que encuentres

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
precioTotal = document.getElementById("precioTotal");
// totalProductos
// Numeracion de la primera columna de la tabla
let cont = 0
let costoTotal = 0;
let totalEnProductos = 0;
// ----------------------------------------------------
//almacena los elementos de la tabla en localStorage 
let datos = new Array(); //[]
//{}

//recrear la tabla siempre 
// let tablaListaCompras=getElementById("tablaListaCompras")

function validarCantidad() {
    if (txtNumber.value.trim().length <= 0) {
        console.log("false");
        return false;
    }//length <=0

    // Important to return true or false depending of the condition
    //mayor a cero
    if (isNaN(txtNumber.value)) {
        return false;
    } //isNAN

    //este nunca me va a regresar un NaN por el return de la previa funcion.
    //Es como comparar primero una cosa y luego otra 
    if (Number(txtNumber.value) <= 0) {
        return false;
    } //<=0
    return true;
}; //validar cantidad


function getPrecio() {  // funcion aleatoria que genera un precio
    //un precio no maximo de 100
    return Math.round((Math.random() * 10000)) / 100;
    // el to fixed no sirve para esto porque regresa un string 
};

btnAgregar.addEventListener("click", function (event) {
    // Prevent default
    event.preventDefault();

    //flag -> True -> add values, default=True
    let isValid = true;

    //Reset State
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    // ------------
    // Remove whitespaces
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtName.value.length <= 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//length>=3

    if (!validarCantidad()) {
        txtNumber.style.border = "solid medium red";
        //agregar los dos mensajes de error
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//length>=3
    // ojoo aqui perdi mucho tiempo porque no sabia que esta funcion debe estar denntro de
    // la funcion de cliquear el boton
    if (isValid) {
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                  <td>${cont}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>   
                  <td>${precio}</td>   
                  </tr>`;
        //agregar el json que se creo, es un objeto
        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio

        }; //isValid
        // usar pop en lugar de unshift
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));
        //add each element to the next row
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        // asignacion de nuevos elementos
        contadorProductos.innerText = cont;
        costoTotal += precio * Number(txtNumber.value)  //ya esta correctamente validado cuando llega aca 
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        //Esto es importante moverlo despues de que se actualizan los datos
        let resumen = {
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };
        localStorage.setItem("resumen", JSON.stringify(resumen))
        // ----------------------------------------------------------------

        txtName.value = ""
        txtNumber.value = ""
        txtName.focus();   //esto es para UX anadir al usuario

    };//if is Valid
}); //btnAgregar.addEvent Listener clcik

window.addEventListener("load", function (event) {
    event.preventDefault();
    //el resumen es importante tenerlo, porque sino no existe
    // let resumen = {
    //     "cont": cont,
    //     "totalEnProductos": totalEnProductos,
    //     "costoTotal": costoTotal
    // };
    // --------------------------------------------------
    //        // function previous (){
    //        // if (localStorage.getItem("datos") != null) {
    //        //Me traigo los datos, el this es para restaurar los datos desde aqui 
    //        // datos = JSON.parse(localStorage.getItem("datos"));
    //        // }//datos != null
    //        // };
    // -------------------------------------------------- 
    //         // Previous can be optimized
    datos = JSON.parse(this.localStorage.getItem("datos")) || [];
    // --------------------------------------------------
    // Pinta la tabla con los JSON que recupero anteriormente
    datos.forEach((d) => {
        let row = `<tr>
                        <td>${d.cont}</td>
                        <td>${d.nombre}</td>
                        <td>${d.cantidad}</td>
                        <td>${d.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
    // -------------------------------------------------------

    if (localStorage.getItem("resumen") != null) {
        //Me traigo los datos, el this es para restaurar los datos desde aqui 
        let resumen = JSON.parse(localStorage.getItem("resumen"));
        //inicializando las variables
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }//resumen != null

    //se establecen los valoes de las variables 
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    // ------------------------------------------------------

});// window.addEventListener load


btnClear = document.getElementById("btnClear");


btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("yei you clicked");

    // delete data from local storage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    // Reset State 
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    // Reset State for the table
    productosTotal.innerText = "";
    precioTotal.innerText = "";
    contadorProductos.innerText = "";

    // //detele table, MUCHO OJO AQUI, NO ES NECESARIO BEFOREEND
    cuerpoTabla.innerHTML = "";

    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;

}); //btn mostrar



// agregar la funcionalidad del boton limpiar todo
// resumen
// tabla
// campos
// alerta
// dos variables de localStorage solo resumen y datos para no afectar  [done]






