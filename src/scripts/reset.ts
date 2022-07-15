export const btnResetAll = document.querySelector('.btn-reset-all');
export const btnResetFilters = document.querySelector('.btn-reset-filters');

import { formCollection, formMetal, formColor } from './filterCards';
import { renderCard } from './createCards';
import { filterCards } from './rangeFilterCards';
import {
    chooseFilteredCards,
    showChosenFiltersCollection,
    showChosenFiltersMetal,
    showChosenFiltersColor,
    showPopularCards,
} from './filterCards';

export function resetAll() {
    localStorage.clear();
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
