import './assets/styles/main.scss';
import './assets/styles/style.css';

import { renderCard } from './scripts/createCards';

import * as noUiSlider from 'nouislider';

import { changeBasket } from './scripts/changeQuantityInBasket';

import { filterCards } from './scripts/filterCards';
import { filters } from './scripts/filterCards';

const cards = document.querySelector('.cards');

const select = document.querySelector('.sort__select');

const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;
const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

renderCard();

import { sortCard } from './scripts/sortCards';

cards.addEventListener('click', changeBasket);

sortCard(null, localStorage.getItem('sort'));
select.addEventListener('change', sortCard);

sliderYear.noUiSlider.on('set', function (values, handle, unencoded, tap, positions, noUiSlider) {
    filters.minYear = unencoded[0];
    filters.maxYear = unencoded[1];
    filterCards();
});

sliderPrice.noUiSlider.on('set', function (values, handle, unencoded, tap, positions, noUiSlider) {
    filters.minPrice = unencoded[0];
    filters.maxPrice = unencoded[1];
    filterCards();
});

filterCards();
