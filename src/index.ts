import './assets/styles/main.scss';
import './assets/styles/style.css';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { renderCard } from './scripts/createCards';

import { changeBasket } from './scripts/changeQuantityInBasket';

const sliderYear = document.getElementById('slider-year');
const sliderQuantity = document.getElementById('slider-quantity');

const cards = document.querySelector('.cards');

noUiSlider.create(sliderYear, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
});
noUiSlider.create(sliderQuantity, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
});

renderCard();

cards.addEventListener('click', changeBasket);
