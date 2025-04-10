const txtName = document.getElementById("Name");  //siempre pones txt para saber que es un variable de texto
const txtNumber = document.getElementById("Number");  
const btnAgregar= document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras=document.getElementById("tablaListaCompras");
const cuerpoTabla= tablaListaCompras.getElementsByTagName("tbody").item(0); //el primer elemento que encuentres

const contadorProductos =document.getElementById("contadorProductos");
const productosTotal =document.getElementById("productosTotal");
precioTotal  = document.getElementById("precioTotal");
// totalProductos
// Numeracion de la primera columna de la tabla
let cont=0 
let costoTotal=0;
let totalEnProductos=0;

function validarCantidad(){
    if (txtNumber.value.trim().length<=0){
        console.log("false");
        return false;
    }//length <=0

    // Important to return true or false depending of the condition
    //mayor a cero
    if(isNaN(txtNumber.value)){
        return false;
    } //isNAN
    
    //este nunca me va a regresar un NaN por el return de la previa funcion.
    //Es como comparar primero una cosa y luego otra 
    if(Number(txtNumber.value)<=0){
        return false;
    } //<=0
    
    
    
    return true;
}; //validar cantidad


function getPrecio(){
    //un precio no maximo de 100
    return Math.round((Math.random()*10000))/ 100;
    // el to fixed no sirve para esto porque regresa un string 
};

btnAgregar.addEventListener("click",function(event){
    // Prevent default
    event.preventDefault();

    //flag -> True -> add values, default=True
    let isValid=true;

    //Reset State
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    // ------------
    // Remove whitespaces
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <=3){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML= "<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//length>=3
    
    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        //agregar los dos mensajes de error
        alertValidacionesTexto.innerHTML+= "<br/><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//length>=3
    // ojoo aqui perdi mucho tiempo porque no sabia que esta funcion debe estar denntro de
    // la funcion de cliquear el boton
    if(isValid){
        cont++;
        let precio = getPrecio();
        let row= `<tr>
                  <td>${cont}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>   
                  <td>${precio}</td>   
                  </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        // asignacion de nuevos elementos
        contadorProductos.innerText= cont;
        costoTotal += precio * Number(txtNumber.value)  //ya esta correctamente validado cuando llega aca 
        precioTotal.innerText="$ "+costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        txtName.value=""
        txtNumber.value=""
        txtName.focus();   //esto es para UX anadir al usuario

    };//if is Valid
});





