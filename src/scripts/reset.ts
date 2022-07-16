export const btnResetAll = document.querySelector('.btn-reset-all');
export const btnResetFilters = document.querySelector('.btn-reset-filters');
const cards = document.querySelector('.cards');

import { formCollection, formMetal, formColor } from './filterCards';
import { renderCard } from './createCards';
import { filterCards } from './rangeFilterCards';
import {
    chooseFilteredCards,
    showChosenFiltersCollection,
    showChosenFiltersMetal,
    showChosenFiltersColor,
} from './filterCards';
import { options, sortCard } from './sortCards';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { sliderYear, sliderPrice } from './rangeFilterCards';
import { showPopularCards } from './filterPopular';

export function resetAll() {
    localStorage.clear();
    // sliderYear.noUiSlider.set([2000, 2022]);
    // sliderPrice.noUiSlider.set([85, 260]);
    // options.forEach((item) => {
    //     if ((item as HTMLOptionElement).value === 'Sort by name(from a to z)') {
    //         (item as HTMLOptionElement).selected = true;
    //     }
    // });
    // formCollection.forEach((item) => ((item as HTMLInputElement).checked = false));
    // cards.innerHTML = null;
    // filterCards();

    // renderCard();
    // sortCard();

    // chooseFilteredCards();
    // showChosenFiltersCollection();
    // showChosenFiltersMetal();
    // showChosenFiltersColor();
    location.reload();
}

export function resetFilters() {
    localStorage.removeItem('filters');
    localStorage.removeItem('popularChecked');
    localStorage.removeItem('yearStart');
    localStorage.removeItem('yearEnd');
    localStorage.removeItem('priceStart');
    localStorage.removeItem('priceEnd');
    localStorage.removeItem('searchText');

    // localStorage.removeItem('rangeFilteredCards');
    location.reload();
}
