import './assets/styles/main.scss';
import './assets/styles/style.css';
import { renderCard } from './scripts/createCards';
// localStorage.clear();
import * as noUiSlider from 'nouislider';

import { changeBasket } from './scripts/changeQuantityInBasket';

import { filterCards, rangeFilters } from './scripts/rangeFilterCards';
// import { rangeFilters } from './scripts/rangeFilterCards';

import {
    chooseFilter,
    chooseFilteredCardsCollection,
    // chooseFilteredCardsMetal,
    showChosenFiltersMetal,
    showChosenFiltersColor,
} from './scripts/filterCards';

import { showChosenFiltersCollection } from './scripts/filterCards';

const cards = document.querySelector('.cards');

const select = document.querySelector('.sort__select');

const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;
const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

renderCard();

import { sortCard } from './scripts/sortCards';
import { itemType } from './scripts/types';

cards.addEventListener('click', changeBasket);

sortCard(null, localStorage.getItem('sort'));
select.addEventListener('change', sortCard);

sliderYear.noUiSlider.on('set', function (values, handle, unencoded) {
    rangeFilters.minYear = unencoded[0];
    rangeFilters.maxYear = unencoded[1];
    filterCards();
});

sliderPrice.noUiSlider.on('set', function (values, handle, unencoded) {
    rangeFilters.minPrice = unencoded[0];
    rangeFilters.maxPrice = unencoded[1];
    filterCards();
});

filterCards();
// console.log(JSON.parse(localStorage.getItem('filters')));

const cardsArr = Array.from(document.querySelectorAll('.card'));
// import { sortFilteredCards } from './scripts/sortCards';

const formCollection = document.querySelectorAll('.collection .category__label .category__input');
const formMetal = document.querySelectorAll('.metal .category__label .category__input');
const formColor = document.querySelectorAll('.color .category__label .category__input');

formCollection.forEach((item) =>
    item.addEventListener('click', (event) => {
        const value = (event.target as HTMLInputElement).name;
        switch (value) {
            case 'timeless elegance':
                chooseFilter(event, value);
                break;
            case 'back to school':
                chooseFilter(event, value);
                break;
            case 'milan':
                chooseFilter(event, value);
                break;
            case 'portugal':
                chooseFilter(event, value);
                break;
        }
    })
);
formMetal.forEach((item) =>
    item.addEventListener('click', (event) => {
        const value = (event.target as HTMLInputElement).name;
        switch (value) {
            case 'gold':
                chooseFilter(event, value);
                break;
            case 'silver':
                chooseFilter(event, value);
                break;
            case 'pink gold':
                chooseFilter(event, value);
                break;
        }
    })
);
formColor.forEach((item) =>
    item.addEventListener('click', (event) => {
        const value = (event.target as HTMLInputElement).name;
        switch (value) {
            case 'yellow':
                chooseFilter(event, value);
                break;
            case 'grey':
                chooseFilter(event, value);
                break;
            case 'pink':
                chooseFilter(event, value);
                break;
        }
    })
);

import { filters } from './scripts/filterCards';
console.log(JSON.parse(localStorage.getItem('filters')), 'log');
// console.log(filters, 'filters');
chooseFilteredCardsCollection();
// chooseFilteredCardsMetal();

showChosenFiltersCollection();
showChosenFiltersMetal();
showChosenFiltersColor();
