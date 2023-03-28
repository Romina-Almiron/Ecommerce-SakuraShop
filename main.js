let categoria;
let producto;
let cantidad;
let precio;
let total = 0;

const bienvenidoUsuario = () =>{

  let nombre = prompt("Por favor ingrese un nombre:").toUpperCase();

  while(isNaN(nombre) && nombre !== ""){

    const bienvenidoMensaje = `Bienvenida/o ${nombre} a Sakurashop!`;
    alert(bienvenidoMensaje);
    mostrarCategorias();
    return;
  }
  alert("Ingrese nombre válido.");
  bienvenidoUsuario();
}

// lista de las categorias y  opcion de finalizar compra

//Esta funcion lista todas las categorias y la opcion de finalizar compra

function mostrarCategorias() {
  
  categoria = parseInt(prompt("Por favor, seleccione una categoría:\n1. Plantas de hogar\n2. Plantas de oficina\n3. Plantas para regalar\n4. Finalizar compra"));

  if (categoria == 4) {
    finalizarCompra();
    return;
  } else if (categoria > 3 || categoria < 1) {
    alert("Esa categoría no existe");
    mostrarCategorias();
    return;
  } else {
    mostrarProductosPorCategoria(categoria);
  }
  if (isNaN(categoria)) {
    finalizarCompra();
  }
}

function mostrarProductosPorCategoria(categoriaSeleccionada) {

  //Con el switch comparo la categoria seleccionada y muestro los productos corrspóndientes

  switch (categoriaSeleccionada) {
      case 1:
          producto = parseInt(prompt("Seleccione un producto:\n1. Planta1 - $100\n2. Planta2 - $150\n3. Planta3 - $200"));
          if (!isNaN(producto)) {
              switch (producto) {
                  case 1: precio = 100; break;
                  case 2: precio = 150; break;
                  case 3: precio = 200; break;
                  default: mostrarProductosPorCategoria(categoria); break;
              }

              confirmarProducto();
              return;
          } else {
              preguntarCategoria();
              return;
          }
          break;
      case 2:
          producto = parseInt(prompt("Seleccione un producto:\n1. Poficina1 - $100\n2. Poficina2 - $150\n3. Poficina33 - $200"));
          if (!isNaN(producto)) {
              switch (producto) {
                  case 1: precio = 100; break;
                  case 2: precio = 150; break;
                  case 3: precio = 200; break;
                  default: mostrarProductosPorCategoria(categoria); break;
              }
              confirmarProducto();
              return;
          } else {
              preguntarCategoria();
              return;
          }
          break;
      case 3:
          producto = parseInt(prompt("Seleccione un producto:\n1. Pregalo1 - $100\n2. Pregalo2 - $150\n3. Pregalo3 - $200"));
          if (!isNaN(producto)) {
              switch (producto) {
                  case 1: precio = 100; break;
                  case 2: precio = 150; break;
                  case 3: precio = 200; break;
                  default: mostrarProductosPorCategoria(categoria); break;
              }
              confirmarProducto();
              return;
          } else {
              preguntarCategoria();
              return;
          }
          break;
  }
}

function confirmarProducto() {

  let añadir = confirm("El producto seleccionado cuesta $" + precio + ". ¿Desea agregarlo al carrito?");
  if (añadir) {
      cantidad = parseInt(prompt("Por favor, indique la cantidad que desea comprar:"));
      if (!isNaN(cantidad)) {
        total += precio * cantidad;
        alert("El producto se ha agregado al carrito. Su total actual es: $" + total);
      } else {
        preguntarCategoria();
      }
  } else {
    preguntarCategoria();
  }
  preguntarCategoria();
}

function preguntarCategoria() {
  if (confirm("¿Desea seguir viendo productos de la categoría anterior?")) {
    mostrarProductosPorCategoria(categoria);
  } else {
    mostrarCategorias();
  }
}

function finalizarCompra() {
  if (confirm("Desea finalizar su compra?")) {
    mostrarFinal();
  } else {
    mostrarCategorias();
  }
}

function mostrarFinal() {
  if (total > 0) {
    alert("Gracias por su compra, su total es de: $" + total);
  } else {
    alert("Esperamos que vuelva pronto.");
  }
}
bienvenidoUsuario();