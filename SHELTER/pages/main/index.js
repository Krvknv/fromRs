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
//
//
//
// Make slider
import pets from "./pets.js";
const btnSliderPrev = document.querySelector(".btn-prev");
const btnSliderNext = document.querySelector(".btn-next");
const cardName = document.querySelectorAll(".gallery__name");
const cardImage = document.querySelectorAll(".gallery__img img");

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

// function shuffleArray(arr) {
//   var j, temp;
//   for (let i = arr.length - 1; i > 0; i--) {
//     j = Math.floor(Math.random() * (i + 1));
//     temp = arr[j];
//     arr[j] = arr[i];
//     arr[i] = temp;
//   }
//   return arr;
// }
let previous = [];
function renderCards() {
  let newPets = pets.filter((element) => {
    return !previous.includes(element.name);
  });

  const randomPets = shuffleArray(newPets).slice(0, countCards());

  // let arrCard = shuffleArray(pets);

  // cardName[i].innerHTML = `${arrCard[i].name}`;
  // cardImage[i].src = `${arrCard[i].img}`;
  // cardImage[i].alt = `${arrCard[i].name}`;
}

renderCards();
btnSliderNext.addEventListener("click", function () {
  i += 3;
  renderCards();
  if (i >= pets.length) {
    i = 0;
  }
  console.log(i);
});
// let shownCards = [];
// function chooseCards() {
//   let result = [];
//   let cardsQuantity = countCards();
//   pets.forEach((item) => {
//     if (result.length < cardsQuantity) {
//       if (!shownCards.find((elem) => elem.name === item.name)) {
//         result.push(item);
//         shownCards.push(item);
//       }
//     }
//   });
//   if (shownCards.length > cardsQuantity) {
//     shownCards.splice(0, cardsQuantity);
//   }
//   return result;
// }
// function renderCards() {
//   let arrCard = chooseCards();
//   arrCard.forEach((item, index) => {
//     cardName[index].innerHTML = `${item.name}`;
//     cardImage[index].src = `${item.img}`;
//     cardImage[index].alt = `${item.name}`;
//   });
// }

// console.log(width);
// console.log(countCards());
//
//
//
// events
hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
cover.addEventListener("click", function () {
  nav.classList.remove("nav__open");
  nav.classList.add("nav__hidden");
  hamburger.classList.remove("open");
  cover.style.display = "none";
  logoUsual.style.opacity = "1";
});
