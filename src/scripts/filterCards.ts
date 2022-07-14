import { itemType } from './types';
import { renderCard } from './createCards';
import { sortFilteredCards } from './sortCards';

const cards = document.querySelector('.cards');
export const formCollection = document.querySelectorAll('.collection .category__label .category__input');
export const formMetal = document.querySelectorAll('.metal .category__label .category__input');
const formColor = document.querySelectorAll('.color .category__label .category__input');

export let filters: string[] = JSON.parse(localStorage.getItem('filters')) || [];

export function showChosenFiltersCollection() {
    if (filters.length > 0) {
        for (const item of formCollection) {
            if (filters.includes((item as HTMLInputElement).name)) {
                (item as HTMLInputElement).checked = true;
            }
        }
    }
}
export function showChosenFiltersMetal() {
    if (filters.length > 0) {
        for (const item of formMetal) {
            if (filters.includes((item as HTMLInputElement).name)) {
                (item as HTMLInputElement).checked = true;
            }
        }
    }
}
export function showChosenFiltersColor() {
    if (filters.length > 0) {
        for (const item of formColor) {
            if (filters.includes((item as HTMLInputElement).name)) {
                (item as HTMLInputElement).checked = true;
            }
        }
    }
}

export function chooseFilter(event: Event, value: string) {
    if ((event.target as HTMLInputElement).checked) {
        filters.push(value);
        localStorage.setItem('filters', JSON.stringify(filters));

        chooseFilteredCardsCollection();
    } else {
        filters = filters.filter((item) => {
            return item !== value;
        });

        localStorage.setItem('filters', JSON.stringify(filters));

        chooseFilteredCardsCollection();
    }
}

export function chooseFilteredCardsCollection() {
    if (filters.length === 0) {
        cards.innerHTML = null;
        renderCard();
        return;
    }

    const filteredCards: itemType[] = [];
    const rangeFilteredCardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
    if (
        (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
        (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
    ) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.metal.toLowerCase()) && filters.includes(card.color.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }
    if (
        (filters.includes('timeless elegance') ||
            filters.includes('back to school') ||
            filters.includes('milan') ||
            filters.includes('portugal')) &&
        (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
    ) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.collection.toLowerCase()) && filters.includes(card.color.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }
    if (
        (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
        (filters.includes('timeless elegance') ||
            filters.includes('back to school') ||
            filters.includes('milan') ||
            filters.includes('portugal')) &&
        (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
    ) {
        for (const card of rangeFilteredCardsArr) {
            if (
                filters.includes(card.collection.toLowerCase()) &&
                filters.includes(card.metal.toLowerCase()) &&
                filters.includes(card.color.toLowerCase())
            ) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }
    if (
        (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
        (filters.includes('timeless elegance') ||
            filters.includes('back to school') ||
            filters.includes('milan') ||
            filters.includes('portugal'))
    ) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.collection.toLowerCase()) && filters.includes(card.metal.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }
    if (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.metal.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }
    if (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink')) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.color.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
        return;
    }

    if (
        filters.includes('timeless elegance') ||
        filters.includes('back to school') ||
        filters.includes('milan') ||
        filters.includes('portugal')
    ) {
        for (const card of rangeFilteredCardsArr) {
            if (filters.includes(card.collection.toLowerCase())) {
                filteredCards.push(card);
            }
        }
        if (filteredCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        } else {
            sortFilteredCards(filteredCards);
        }
    }
}
