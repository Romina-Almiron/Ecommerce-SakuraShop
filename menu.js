const openMenu = document.querySelector("#open-menu");
const cerrarMenu = document.querySelector("#cerrar-menu");
const aside = document.querySelector("aside");




openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
});

cerrarMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
});
  


    

