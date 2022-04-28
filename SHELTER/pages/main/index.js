// Make menu for mobile
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
    document.body.style.overflow = "hidden";
  } else {
    nav.classList.remove("nav__open");
    nav.classList.add("nav__hidden");
    hamburger.classList.remove("open");
    cover.style.display = "none";
    logoUsual.style.opacity = "1";
    document.body.style.overflow = " ";
  }
}

function closeMenu(event) {
  if (event.target.classList.contains("link")) {
    nav.classList.remove("nav__open");
    nav.classList.add("nav__hidden");
    hamburger.classList.remove("open");
    cover.style.display = "none";
    logoUsual.style.opacity = "1";
    document.body.style.overflow = " ";
  }
}
//
//
//
// Make slider
const btnSliderPrev = document.querySelector(".btn-prev");
const btnSliderNext = document.querySelector(".btn-next");
const btnSliderPrevMobile = document.querySelector(".btn-mobile-prev");
const btnSliderNextMobile = document.querySelector(".btn-mobile-next");
const cardName = document.querySelectorAll(".gallery__name");
const cardImage = document.querySelectorAll(".gallery__img img");
const cardsList = document.querySelectorAll(".gallery__card");
const list = document.querySelector(".gallery__list");

let width = document.documentElement.clientWidth;

function countCards() {
  if (width <= 1279 && width >= 768) {
    return 2;
  }
  if (width <= 767) {
    return 1;
  }
  return 3;
}

function shuffleArray(arr) {
  var j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

let previous = [];
function renderCards() {
  let newPets = pets.filter((element) => {
    return !previous.find((item) => item.name === element.name);
  });

  const randomPets = shuffleArray(newPets).slice(0, countCards());

  previous = randomPets;

  randomPets.forEach((element, i) => {
    console.log(randomPets[i]);
    cardName[i].innerHTML = `${element.name}`;
    cardImage[i].src = `${element.img}`;
    cardImage[i].alt = `${element.name}`;
    cardsList[i].id = `${element.name}`;
    // list.classList.add("animation");
  });
  console.log(list.style.opacity, typeof list.style.opacity);
  if (list.style.opacity === "1") {
    list.classList.remove("animation");
  }
}

renderCards();

btnSliderNext.addEventListener("click", renderCards);
btnSliderPrev.addEventListener("click", renderCards);
btnSliderNextMobile.addEventListener("click", renderCards);
btnSliderPrevMobile.addEventListener("click", renderCards);

btnSliderNext.addEventListener("click", () => {
  list.classList.add("animationnext");
});
btnSliderPrev.addEventListener("click", () => {
  list.classList.add("animationprev");
});
btnSliderNextMobile.addEventListener("click", () => {
  list.classList.add("animationnext");
});
btnSliderPrevMobile.addEventListener("click", () => {
  list.classList.add("animationprev");
});

list.addEventListener(
  "animationend",
  () => {
    list.classList.remove("animationnext");
    list.classList.remove("animationprev");
  },
  false
);

//
//
//
// events for menu
hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
cover.addEventListener("click", function () {
  nav.classList.remove("nav__open");
  nav.classList.add("nav__hidden");
  hamburger.classList.remove("open");
  cover.style.display = "none";
  logoUsual.style.opacity = "1";
  document.body.style.overflow = " ";
});
// Make modal windows
const modalWindow = document.querySelector(".modal");
const coverModal = document.querySelector(".cover");
const header = document.querySelector(".header");
const btnModalClose = document.querySelector(".modal__btn_close");

import pets from "./pets.js";

const modalImg = document.querySelector(".modal__img img");
const modalTitle = document.querySelector(".modal__title");
const modalSubTitle = document.querySelector(".modal__subtitle");
const modalText = document.querySelector(".modal__text");
const age = document.querySelector(".age");
const inoculations = document.querySelector(".inculation");
const diseases = document.querySelector(".diseases");
const parasites = document.querySelector(".parasites");

function closeModalWindow() {
  document.body.style.overflow = "";
  coverModal.style.display = "none";
  modalWindow.style.display = "none";
  header.style.display = "block";
}

function renderModal(event) {
  pets.forEach((item) => {
    if (this.id === item.name) {
      modalWindow.style.display = "flex";
      coverModal.style.display = "block";
      header.style.display = "none";
      document.body.style.overflow = "hidden";
      modalImg.src = `${item.img}`;
      modalImg.alt = `${item.name}`;
      modalTitle.innerHTML = `${item.name}`;
      modalSubTitle.innerHTML = `${item.type} - ${item.breed}`;
      modalText.innerHTML = `${item.description}`;
      age.innerHTML = `${item.age}`;
      inoculations.innerHTML = `${item.inoculations.join(",")}`;
      diseases.innerHTML = `${item.diseases.join(",")}`;
      parasites.innerHTML = `${item.parasites.join(",")}`;
      // window.scrollTo(modalWindow.offsetLeft, modalWindow.offsetTop + 400);
      // console.log(modalWindow.offsetLeft);
      // console.log(modalWindow.offsetTop);
    }
  });
}

btnModalClose.addEventListener("click", closeModalWindow);
coverModal.addEventListener("click", closeModalWindow);
coverModal.addEventListener("mouseover", () => {
  btnModalClose.style.background = "#fff";
});
coverModal.addEventListener("mouseout", () => {
  btnModalClose.style.background = "transparent";
});
btnModalClose.addEventListener("mouseover", () => {
  btnModalClose.style.background = "#fff";
});
btnModalClose.addEventListener("mouseout", () => {
  btnModalClose.style.background = "transparent";
});
cardsList.forEach((item) => item.addEventListener("click", renderModal));
