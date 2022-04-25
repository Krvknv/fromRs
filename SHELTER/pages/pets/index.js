// Make menu
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
    logoUsual.style.opacity = "1";
  }
}

hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
//
//
//
//
//
//
// Make modal windows
const modalWindow = document.querySelector(".modal");
const coverModal = document.querySelector(".cover");
const cardsList = document.querySelector(".main__list");
const cards = document.querySelectorAll(".main__card");
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
// let centerX = document.documentElement.clientWidth / 2;
// let centerY = document.documentElement.clientHeight / 2;
let width = document.documentElement.clientWidth;

function renderModal(event) {
  pets.forEach((item) => {
    if (event.target.id === item.name) {
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
      window.scrollTo(modalWindow.offsetLeft, modalWindow.offsetTop - 250);
      // console.log(modalWindow.offsetLeft);
      // console.log(modalWindow.offsetTop);
    }
  });
}
// cards.forEach((item) => item.addEventListener("click", renderModal));

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
//
//
//
//
//
//
// Make pagination
import pages from "./pages.js";
const cardList = document.querySelector(".main__list");
const pageNumberDiv = document.querySelector(".main__pagination-num");
const btnDoublePrev = document.querySelector(".main__pagination-double-prev");
const btnPrev = document.querySelector(".main__pagination-prev");
const btnDoubleNext = document.querySelector(".main__pagination-double-next");
const btnNext = document.querySelector(".main__pagination-next");

let shaffledArray = shuffleArrayPages(pages);
function shuffleArrayPages(obj) {
  for (let key in obj) {
    var j, temp;
    for (let i = obj[key].length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = obj[key][j];
      obj[key][j] = obj[key][i];
      obj[key][i] = temp;
    }
  }
  return obj;
}

function countCardsPages() {
  if (width <= 1279 && width >= 768) {
    return 6;
  }
  if (width <= 767) {
    return 3;
  }
  return 8;
}

function createElements(item) {
  // console.log(item);
  let div = document.createElement("li");
  div.classList.add("main__card");
  div.setAttribute("id", item.name);
  div.innerHTML = `
              <div class="main__img" id="${item.name}">
                <img src="${item.img}" alt="${item.name}" id="${item.name}" />
              </div>
              <span class="main__name" id="${item.name}">${item.name}</span>
              <button id="${item.name}" type="button" class="main__card-btn">Learn more</button>
            `;
  return div;
}

function renderCardList(obj, pageNumber) {
  let arrCards = obj[pageNumber];
  // console.log(typeof pageNumber);
  if (+pageNumber === 1) {
    btnDoublePrev.classList.add("main__pagination-item-disabled");
    btnPrev.classList.add("main__pagination-item-disabled");
    btnDoublePrev.setAttribute("disabled", "disabled");
    btnPrev.setAttribute("disabled", "disabled");
  } else {
    btnDoublePrev.classList.remove("main__pagination-item-disabled");
    btnPrev.classList.remove("main__pagination-item-disabled");
    btnDoublePrev.removeAttribute("disabled");
    btnPrev.removeAttribute("disabled");
  }
  if (+pageNumber === 6) {
    btnDoubleNext.classList.add("main__pagination-item-disabled");
    btnNext.classList.add("main__pagination-item-disabled");
    btnDoubleNext.setAttribute("disabled", "disabled");
    btnNext.setAttribute("disabled", "disabled");
  } else {
    btnDoubleNext.classList.remove("main__pagination-item-disabled");
    btnNext.classList.remove("main__pagination-item-disabled");
    btnDoubleNext.removeAttribute("disabled");
    btnNext.removeAttribute("disabled");
  }
  cardList.innerHTML = "";
  for (let i = 0; i <= countCardsPages() - 1; i++) {
    const div = createElements(arrCards[i]);
    console.log(div);
    cardList.prepend(div);
    // console.log(i);
    // console.log(obj[pageNumber][i].name);
  }
}
renderCardList(shaffledArray, 1);

function changePage(numberPage) {
  pageNumberDiv.innerHTML = numberPage;
  renderCardList(shaffledArray, numberPage);
}
btnDoubleNext.addEventListener("click", () => {
  changePage(6);
});
btnNext.addEventListener("click", () => {
  changePage(+pageNumberDiv.innerHTML + 1);
});
btnDoublePrev.addEventListener("click", () => {
  changePage(1);
});
btnPrev.addEventListener("click", () => {
  changePage(+pageNumberDiv.innerHTML - 1);
});

// document.addEventListener("DOMContentLoaded", (event) => {
//   cards.forEach((item) => item.addEventListener("click", renderModal));
// });
cardsList.addEventListener("click", renderModal);
