const productos = [
  //Plantas de interior
  {
    id: "petunia",
    titulo: "Petunia",
    imagen: "img/hogar1.jpg",
    categoria: {
      nombre: "Plantas de interior",
      id: "plantas de interior",
    },
    precio: 100,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."             
  },
  {
    id: "camelia",
    titulo: "Camelia",
    imagen:"img/hogar2.jpg",
    categoria: {
      nombre:"Plantas de interior",
      id:"plantas de interior",
    },
    precio: 200,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "cilantro",
    titulo: "Cilantro",
    imagen: "img/hogar3.jpg",
    categoria: {
      nombre: "Plantas de interior",
      id:"plantas de interior",
    },
    precio: 250,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  //Plantas de oficina
  {
    id: "helecho",
    titulo: "Helecho",
    imagen:"img/oficina1.jpg",
    categoria: {
      nombre: "Plantas de oficina",
      id:"plantas de oficina",
    },
    precio: 150,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "ketia",
    titulo: "Ketia",
    imagen:"img/oaficina2.jpg",
    categoria: {
      nombre: "Plantas de oficina",
      id:"plantas de oficina",
    },
    precio: 200,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "suculenta",
    titulo: "Suculenta",
    imagen:"img/oficina3.jpg",
    categoria: {
      nombre: "Plantas de oficina",
      id:"plantas de oficina",
    },
    precio: 250,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  //Plantas para regalar
  {
    id: "anturio",
    titulo: "Anturio",
    imagen:"img/regalo1.jpg",
    categoria: {
      nombre: "Plantas para regalar",
      id:"plantas para regalar",
    },
    precio: 100,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "cretonia",
    titulo: "Cretonia",
    imagen:"img/regalo2.jpg",
    categoria: {
      nombre: "Plantas para regalar",
      id:"plantas para regalar",
    },
    precio: 150,
    cantidad : 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "orquidia",
    titulo: "Orquidia",
    imagen:"img/regalo3.jpg",
    categoria: {
      nombre: "Plantas para regalar",
      id:"plantas para regalar",
    },
    precio: 200,
    cantidad: 0,
    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  
];

//DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const buscador = document.querySelector('#buscador');


function cargarProductos(productosElejidos){

  contenedorProductos.innerHTML="";

  productosElejidos.forEach(producto =>{

    const div = document.createElement("div");
    div.classList.add("contenedor-producto");
    div.innerHTML = `
        
      <img class="producto-imagen"  src="${producto.imagen}" alt="${producto.titulo}">
      <h3> ${producto.titulo}</h3>
      <div class="descripcion">
        <p>${producto.descripcion}</p>
      </div>
      <div class="precio">$${producto.precio}</div>
      <button class="producto-agregar" id="${producto.id}">Agregar</button>
      </div>
      `;
    contenedorProductos.append(div);
  })
  actualizarBotonesAgregar();
}
cargarProductos(productos);

//MENU

botonesCategoria.forEach(boton =>{

  boton.addEventListener("click",(e) =>{
    botonesCategoria.forEach(boton =>boton.classList.remove("active"));
    e.currentTarget.classList.add("active");
    
   //Se llama  a productos por su categoria

   if(e.currentTarget.id != "todos los productos"){
    const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
    tituloPrincipal.innerText = productoCategoria.categoria.nombre;
    const productosSeleccionados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
    cargarProductos(productosSeleccionados);
   }else{
    tituloPrincipal.innerText = "Todos los productos";
    cargarProductos(productos);
   }
  })
})
//AGREGAR

function actualizarBotonesAgregar(){

  botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach(boton =>{
    boton.addEventListener("click",agregarAlCarrito);
  });
}
//LOCAL STORAGE para el carrito

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
}else{
   productosEnCarrito = [];
}

function agregarAlCarrito(e){
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if(productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito [index].cantidad++;
  }else{
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumerito();

  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}
function actualizarNumerito(){
  let nuevoNumerito = productosEnCarrito.reduce((acc,producto) =>acc + producto.cantidad,0);
  numerito.innerText = nuevoNumerito;
}
// BUSCADOR

buscador.addEventListener('input', buscarProductos);
const formBusqueda = buscador.closest('form');

function buscarProductos() {

  const textoBusqueda = this.value.toLowerCase();
  const productosFiltrados = productos.filter((producto) => {
    const titulo = producto.titulo.toLowerCase();
    const categoria = producto.categoria.nombre.toLowerCase();
    return titulo.includes(textoBusqueda) || categoria.includes(textoBusqueda);
  });
  if (productosFiltrados.length > 0) {
    contenedorProductos.innerHTML = "";
    cargarProductos(productosFiltrados);
  } else {
    // Muestra un mensaje indicando que el producto no existe
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-error");
    mensaje.textContent = "Producto no encontrado.";
    console.log(mensaje)

    // Se elimina cualquier mensaje previo que pueda existir
    const mensajeAnterior = contenedorProductos.querySelector("p");
    if (mensajeAnterior) {
      mensajeAnterior.parentNode.removeChild(mensajeAnterior);
    }
    contenedorProductos.innerHTML = "";
    contenedorProductos.appendChild(mensaje);
  }
}
formBusqueda.addEventListener('submit', (event) => {
  event.preventDefault();
  buscarProductos.bind(buscador)();
});

