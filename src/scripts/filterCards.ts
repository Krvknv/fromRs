import { itemType } from './types';
import { renderCard } from './createCards';
import { sortFilteredCards } from './sortCards';

const cards = document.querySelector('.cards');
export const formCollection = document.querySelectorAll('.collection .category__label .category__input');
export const metalCollection = document.querySelectorAll('.metal .category__label .category__input');
console.log(metalCollection);
// console.log(formCollection);

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

export function chooseFilter(event: Event, value: string) {
    if ((event.target as HTMLInputElement).checked) {
        filters.push(value);
        console.log(filters);
        localStorage.setItem('filters', JSON.stringify(filters));

        chooseFilteredCards();
    } else {
        filters = filters.filter((item) => {
            return item !== value;
        });
        localStorage.setItem('filters', JSON.stringify(filters));

        chooseFilteredCards();
    }
}

export function chooseFilteredCards() {
    // console.log('flter');
    if (filters.length === 0) {
        cards.innerHTML = null;
        renderCard();
        return;
    }
    const filteredCards: itemType[] = [];
    const rangeFilteredCardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
    for (const filter of filters) {
        for (const card of rangeFilteredCardsArr) {
            if (card.collection.toLowerCase() === filter) {
                filteredCards.push(card);
            }
        }
    }
    if (filteredCards.length === 0) {
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    } else {
        sortFilteredCards(filteredCards);
    }
}
