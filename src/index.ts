import './assets/styles/main.scss';
import './assets/styles/style.css';
import { renderCard } from './scripts/createCards';
import * as noUiSlider from 'nouislider';

import { changeBasket } from './scripts/changeQuantityInBasket';

import { filterCards, rangeFilters } from './scripts/rangeFilterCards';

import {
    chooseFilter,
    chooseFilteredCards,
    showChosenFiltersMetal,
    showChosenFiltersColor,
    filterPopular,
} from './scripts/filterCards';
import { showPopularCards, isPopularChecked } from './scripts/filterPopular';

import { showChosenFiltersCollection } from './scripts/filterCards';
import { btnResetAll, resetAll, btnResetFilters, resetFilters } from './scripts/reset';

import { sortCard } from './scripts/sortCards';

import { searchInput, deleteSearchBtn, cleanInputSearch, searchCards, searchWHilePrint } from './scripts/search';

const cards = document.querySelector('.cards');

const select = document.querySelector('.sort__select');

const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;
const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

const formCollection = document.querySelectorAll('.collection .category__label .category__input');
const formMetal = document.querySelectorAll('.metal .category__label .category__input');
const formColor = document.querySelectorAll('.color .category__label .category__input');

renderCard();

sortCard(null, localStorage.getItem('sort'));

filterCards();

chooseFilteredCards();
showChosenFiltersCollection();
showChosenFiltersMetal();
showChosenFiltersColor();

searchCards();

isPopularChecked();

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

filterPopular.addEventListener('click', showPopularCards);
filterPopular.addEventListener('click', () => {
    if (!(filterPopular as HTMLInputElement).checked) {
        localStorage.removeItem('popularChecked');
    }
});

window.onload = function () {
    (searchInput as HTMLInputElement).focus();
};

cards.addEventListener('click', changeBasket);

btnResetAll.addEventListener('click', resetAll);
btnResetFilters.addEventListener('click', resetFilters);

searchInput.addEventListener('input', searchWHilePrint);
deleteSearchBtn.addEventListener('click', cleanInputSearch);

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
