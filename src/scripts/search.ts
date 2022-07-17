import { chooseFilteredCards } from './filterCards';
import { itemType } from './types';
import { itemArr } from './itemArr';
import { sortFilteredCards } from './sortCards';
import { filterPopular, showPopularCards } from './filterPopular';

export const searchInput = document.querySelector('.search__input');
export const deleteSearchBtn = document.querySelector('.search__cross');
const cards = document.querySelector('.cards');

export function cleanInputSearch() {
    (searchInput as HTMLInputElement).value = '';
    (searchInput as HTMLInputElement).focus();
    returnCards();
}

export function searchCards() {
    const requiredCards: itemType[] = [];

    let cardsArr: itemType[] = [];

    if (JSON.parse(localStorage.getItem('filteredCards'))) {
        if ((filterPopular as HTMLInputElement).checked === true) {
            const arr = JSON.parse(localStorage.getItem('filteredCards'));
            for (const item of arr) {
                if (item.ispopular) {
                    cardsArr.push(item);
                }
            }
        } else {
            cardsArr = JSON.parse(localStorage.getItem('filteredCards'));
        }
    } else if (localStorage.getItem('rangeFilteredCards')) {
        if ((filterPopular as HTMLInputElement).checked === true) {
            const arr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
            for (const item of arr) {
                if (item.ispopular) {
                    cardsArr.push(item);
                }
            }
        } else {
            cardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
        }
    } else {
        cardsArr = itemArr;
    }
    let searchText;

    if (localStorage.getItem('searchText')) {
        searchText = localStorage.getItem('searchText');
        (searchInput as HTMLInputElement).value = localStorage.getItem('searchText');
    } else {
        searchText = (searchInput as HTMLInputElement).value;
        localStorage.setItem('searchText', `${searchText}`);
    }

    for (const card of cardsArr) {
        const cardNameArr = card.collection.toLowerCase();
        if (cardNameArr.includes(searchText)) {
            requiredCards.push(card);
        }
    }
    sortFilteredCards(requiredCards);
    if (!searchText) {
        returnCards();
        localStorage.removeItem('searchText');
    }
    if (requiredCards.length === 0) {
        cards.innerHTML = null;
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    }
}

export function searchWHilePrint() {
    const requiredCards: itemType[] = [];

    let cardsArr: itemType[] = [];
    if (JSON.parse(localStorage.getItem('filteredCards'))) {
        if ((filterPopular as HTMLInputElement).checked === true) {
            const arr = JSON.parse(localStorage.getItem('filteredCards'));
            for (const item of arr) {
                if (item.ispopular) {
                    cardsArr.push(item);
                }
            }
        } else {
            cardsArr = JSON.parse(localStorage.getItem('filteredCards'));
        }
    } else if (localStorage.getItem('rangeFilteredCards')) {
        if ((filterPopular as HTMLInputElement).checked === true) {
            const arr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
            for (const item of arr) {
                if (item.ispopular) {
                    cardsArr.push(item);
                }
            }
        } else {
            cardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
        }
    } else {
        cardsArr = itemArr;
    }

    const searchText = (searchInput as HTMLInputElement).value;
    localStorage.setItem('searchText', `${searchText}`);

    for (const card of cardsArr) {
        const cardNameArr = card.collection.toLowerCase();
        if (cardNameArr.includes(searchText)) {
            requiredCards.push(card);
        }
    }
    sortFilteredCards(requiredCards);

    if (!searchText) {
        returnCards();
        localStorage.removeItem('searchText');
    }

    if (requiredCards.length === 0) {
        cards.innerHTML = null;
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    }
}

function returnCards() {
    chooseFilteredCards();
    showPopularCards();
}
