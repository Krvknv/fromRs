const hamburger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const menuItem = document.querySelectorAll(".nav__item");
const cover = document.querySelector(".header__cover-undermenu");
const links = document.querySelectorAll(".link");
const logoMobile = document.querySelector(".logo__mobile");
const logoUsual = document.querySelector(".logo__usual");

function toggleMenu() {
  if (nav.classList.contains("nav__hidden")) {
    nav.classList.remove("nav__hidden");
    nav.classList.add("nav__open");
    hamburger.classList.add("open");
    cover.style.display = "flex";
    logoUsual.style.opacity = "0";
  } else {
    nav.classList.remove("nav__open");
    nav.classList.add("nav__hidden");
    hamburger.classList.remove("open");
    cover.style.display = "none";
    logoUsual.style.opacity = "1";
  }
}

function closeMenu(event) {
  if (event.target.classList.contains("link")) {
    nav.classList.remove("nav__open");
    nav.classList.add("nav__hidden");
    hamburger.classList.remove("open");
    cover.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
