let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//Dom
const contenedorCarritoVacio = document.querySelector("#carrito-vacío");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoCompleto = document.querySelector("#carrito-completo");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar =document.querySelector("#carrito-comprar");

function cargarProductosCarrito(){

  if(productosEnCarrito && productosEnCarrito.length>0){

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoCompleto.classList.add("disabled");
    
    contenedorCarritoProductos.innerHTML="";
    
    productosEnCarrito.forEach(producto =>{

      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML =`
        <img  class="carrito-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
          <small>Título</small>
          <h3 class="titulo">${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>Cantidad</small>
          <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
          <small>Precio</small>
          <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
          <small>Subtotal</small>
          <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
        `;
        contenedorCarritoProductos.append(div);
        })
    }else{
      contenedorCarritoVacio.classList.remove("disabled");
      contenedorCarritoProductos.classList.add("disabled");
      contenedorCarritoAcciones.classList.add("disabled");
       contenedorCarritoCompleto.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

//ELIMINAR

function actualizarBotonesEliminar(){

  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach(boton =>{
    boton.addEventListener("click",eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e){

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
  productosEnCarrito.splice(index,1); 
  cargarProductosCarrito();
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

//VACIAR CARRITO
  botonVaciar.addEventListener("click",VaciarCarrito);

  botonVaciar.addEventListener("mouseenter", () => {
    botonVaciar.classList.add("hover-effect");
  });
  
  botonVaciar.addEventListener("mouseleave", () => {
    botonVaciar.classList.remove("hover-effect");
  });
  
function VaciarCarrito(){
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
}

//TOTAL

function actualizarTotal(){
  const totalCalculado = productosEnCarrito.reduce((acc,producto) =>acc + (producto.precio * producto.cantidad),0);
  total.innerText= `$${totalCalculado} `
}

//COMPRAR

botonComprar.addEventListener("click",comprarCarrito);

function comprarCarrito(){

  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoCompleto.classList.remove("disabled");
}