const categorias = [
  {
    nombre:"Plantas de hogar",
    productos:[
      { nombre: "Planta1", precio: 100},
      { nombre: "Planta2", precio: 150},
      { nombre: "Planta3",  precio:200},
    ],
  },
  {
    nombre: "Plantas de oficina",
    productos:[
      {nombre: "Poficina1", precio: 100},
      {nombre: "Poficina2", precio: 150},
      {nombre: "Poficina3", precio: 200},
    ],
  },
  {
    nombre: "Plantas para regalar",
    productos:[
      { nombre: "Pregalo1", precio: 100 },
      { nombre: "Pregalo2", precio: 150 },
      { nombre: "Pregalo3", precio: 200 },
    ],
  },
];

const bienvenidoUsuario = () => {
  let nombres = "";

  while (nombres === "" || /[^a-zA-Z]/.test(nombres)) {
    nombres = prompt("Por favor ingrese un nombre:").toUpperCase();
  }

  nombres = nombres.split(" ");

  nombres.forEach(nombre => {
    const bienvenidoMensaje = `Bienvenida/o ${nombre} a Sakurashop!`;
    alert(bienvenidoMensaje);
    mostrarCategorias();
  });
}

let total = 0;
let carrito = [];

function mostarProductosPorCategoria(categoriaSeleccionada){
  const categoria = categorias[categoriaSeleccionada - 1];
  const productos = categoria.productos.map((producto, index) => `${index + 1}. ${producto.nombre} - $${producto.precio}`);
  const productoSeleccionado = parseInt(prompt(`Seleccione un producto:\n${productos.join("\n")}`));
  if (isNaN(productoSeleccionado) || productoSeleccionado < 1 || productoSeleccionado > productos.length) {
    preguntarCategoria();
    return;
  }
  const producto = categoria.productos[productoSeleccionado - 1];
  precio = producto.precio;
  confirmarProducto(producto.nombre);
}

function confirmarProducto(nombreProducto) {
  const cantidad = parseInt(prompt("Indique la cantidad que desea comprar:"));
  
    if (isNaN(cantidad)) {
      preguntarCategoria();
      return;
    }
  
  const añadir = confirm(`El producto ${nombreProducto} cuesta $${precio}. ¿Desea agregarlo al carrito?`);
  
    if (añadir) {
      const subtotal = precio * cantidad;
      carrito.push({ nombre: nombreProducto, cantidad: cantidad, precio: precio, subtotal: subtotal });
      total += subtotal;
      alert(`El producto se ha agregado al carrito. Su total actual es: $${total}`);
    }
    preguntarCategoria();
}

function mostrarCategorias() {
  const opciones = ["Finalizar compra", ...categorias.map((categoria) => categoria.nombre)];
  const categoriaSeleccionada = parseInt(prompt(`Seleccione una categoría:\n${opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join("\n")}`));
  
    if (isNaN(categoriaSeleccionada) || categoriaSeleccionada < 1 || categoriaSeleccionada > opciones.length) {
      finalizarCompra();
      return;
    }
    if (categoriaSeleccionada === 1) {
      finalizarCompra();
      return;
    }
  mostarProductosPorCategoria(categoriaSeleccionada - 1);
}

let finalizada = false;

function preguntarCategoria() {
  if (!finalizada) {
    mostrarCategorias();
  }
}

function mostrarCarrito() {

  if (carrito.length === 0) {
    alert('El carrito está vacío');
  } else {
    let mensaje = 'Productos en el carrito:\n';
    for (let i = 0; i < carrito.length; i++) {
      mensaje += `${i+1}. ${carrito[i].nombre} - $${carrito[i].precio}\n`;
    }
    mensaje += `Total: $${total}`;
    alert(mensaje);
  }
}

function finalizarCompra() {
  let confirmar = true;
  while (confirmar && carrito.length > 0) {
    mostrarCarrito();
    confirmar = confirm(`El total de su compra es: $${total}. ¿Desea finalizar la compra o eliminar algún producto?`);
    if (confirmar) {
      const index = prompt(`Ingrese el número del producto que desea eliminar o presione Cancelar para finalizar la compra`);
      if (index !== null) {
        const i = parseInt(index) - 1;
        if (!isNaN(i) && i >= 0 && i < carrito.length) {
          const eliminado = carrito.splice(i, 1);
          total -= eliminado[0].precio;
          alert(`El producto ${eliminado[0].nombre} ha sido eliminado del carrito`);
        } else {
          alert(`El número de producto ingresado no es válido`);
        }
      } else {
        confirmar = false;
      }
    }
  }
  if (!confirmar) {
    alert(`Gracias por su compra. Su total fue de: $${total}`);
    total = 0;
  }
}
bienvenidoUsuario();

