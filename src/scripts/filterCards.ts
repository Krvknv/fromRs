import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { createCard } from './createCards';
import { itemType } from './types';

const cards = document.querySelector('.cards');

const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;
const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

const sliderYearStart = document.querySelector('.year-start');
const sliderYearEnd = document.querySelector('.year-end');
const sliderPriceStart = document.querySelector('.price-start');
const sliderPriceEnd = document.querySelector('.price-end');

sliderYearStart.textContent = localStorage.getItem('yearStart') || '2000';
sliderYearEnd.textContent = localStorage.getItem('yearEnd') || '2022';

sliderPriceStart.textContent = localStorage.getItem('priceStart') || '85';
sliderPriceEnd.textContent = localStorage.getItem('priceEnd') || '260';

noUiSlider.create(sliderYear, {
    start: [sliderYearStart.textContent, sliderYearEnd.textContent],
    connect: true,
    range: {
        min: 2000,
        max: 2022,
    },
    step: 1,
});

noUiSlider.create(sliderPrice, {
    start: [sliderPriceStart.textContent, sliderPriceEnd.textContent],
    connect: true,
    range: {
        min: 85,
        max: 260,
    },
    step: 1,
});

sliderYear.noUiSlider.on('slide', function (values, handle, unencoded, tap, positions, noUiSlider) {
    localStorage.setItem('yearStart', String(unencoded[0]));
    localStorage.setItem('yearEnd', String(unencoded[1]));
    sliderYearStart.textContent = String(unencoded[0]);
    sliderYearEnd.textContent = String(unencoded[1]);
});
sliderPrice.noUiSlider.on('slide', function (values, handle, unencoded, tap, positions, noUiSlider) {
    localStorage.setItem('priceStart', String(Math.trunc(unencoded[0])));
    localStorage.setItem('priceEnd', String(Math.trunc(unencoded[1])));
    sliderPriceStart.textContent = String(Math.trunc(unencoded[0]));
    sliderPriceEnd.textContent = String(Math.trunc(unencoded[1]));
});

export const filters = {
    maxYear: (sliderYear.noUiSlider.get() as number[])[1],
    minYear: (sliderYear.noUiSlider.get() as number[])[0],
    maxPrice: (sliderPrice.noUiSlider.get() as number[])[1],
    minPrice: (sliderPrice.noUiSlider.get() as number[])[0],
};
// sliderYear.noUiSlider.on('set', function (values, handle, unencoded, tap, positions, noUiSlider) {
//     filters.minYear = unencoded[0];
//     filters.maxYear = unencoded[1];
//     filterCards();
// });

// sliderPrice.noUiSlider.on('set', function (values, handle, unencoded, tap, positions, noUiSlider) {
//     filters.minPrice = unencoded[0];
//     filters.maxPrice = unencoded[1];
//     filterCards();
// });

const filteredCards = new Set();

export function filterCards() {
    filteredCards.clear();
    const sortedCards = JSON.parse(localStorage.getItem('sortedCards'));
    for (const item of sortedCards) {
        if (
            filters.minYear <= item.year &&
            filters.maxYear >= item.year &&
            filters.minPrice <= item.price &&
            filters.maxPrice >= item.price
        ) {
            filteredCards.add(item);
        }
    }
    if (filteredCards.size === 0) {
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    } else {
        localStorage.setItem('filteredCards', JSON.stringify(Array.from(filteredCards)));
        cards.innerHTML = null;
        for (const item of filteredCards) {
            const card = createCard(item as itemType);
            cards.append(card);
        }
    }
}
