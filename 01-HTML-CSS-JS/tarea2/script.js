const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");
const navLinks = navMenu.querySelectorAll("a");

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");

  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });
});
