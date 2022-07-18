import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { createCard } from './createCards';
import { itemType } from './types';
import { chooseFilteredCards } from './filterCards';
import { itemArr } from './itemArr';
import { searchCards } from './search';
import { showPopularCards } from './filterPopular';

const cards = document.querySelector('.cards');

export const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;
export const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

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

sliderYear.noUiSlider.on('slide', function (values, handle, unencoded) {
    localStorage.setItem('yearStart', String(unencoded[0]));
    localStorage.setItem('yearEnd', String(unencoded[1]));
    sliderYearStart.textContent = String(unencoded[0]);
    sliderYearEnd.textContent = String(unencoded[1]);
});
sliderPrice.noUiSlider.on('slide', function (values, handle, unencoded) {
    localStorage.setItem('priceStart', String(Math.trunc(unencoded[0])));
    localStorage.setItem('priceEnd', String(Math.trunc(unencoded[1])));
    sliderPriceStart.textContent = String(Math.trunc(unencoded[0]));
    sliderPriceEnd.textContent = String(Math.trunc(unencoded[1]));
});

export const rangeFilters = {
    maxYear: (sliderYear.noUiSlider.get() as number[])[1],
    minYear: (sliderYear.noUiSlider.get() as number[])[0],
    maxPrice: (sliderPrice.noUiSlider.get() as number[])[1],
    minPrice: (sliderPrice.noUiSlider.get() as number[])[0],
};

const rangeFilteredCards = new Set();

export function filterCards() {
    rangeFilteredCards.clear();
    const sortedCards = JSON.parse(localStorage.getItem('sortedCards')) || itemArr;
    for (const item of sortedCards) {
        if (
            rangeFilters.minYear <= item.year &&
            rangeFilters.maxYear >= item.year &&
            rangeFilters.minPrice <= item.price &&
            rangeFilters.maxPrice >= item.price
        ) {
            rangeFilteredCards.add(item);
        }
    }
    if (rangeFilteredCards.size === 0) {
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    } else {
        localStorage.setItem('rangeFilteredCards', JSON.stringify(Array.from(rangeFilteredCards)));
        cards.innerHTML = null;
        for (const item of rangeFilteredCards) {
            const card = createCard(item as itemType);
            cards.append(card);
        }
        chooseFilteredCards();
        showPopularCards();
        searchCards();
    }
}
