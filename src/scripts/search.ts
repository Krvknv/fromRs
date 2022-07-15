import { renderCard, createCard } from './createCards';
import { chooseFilteredCards } from './filterCards';
import { itemType } from './types';
import { itemArr } from './itemArr';
import { sortFilteredCards } from './sortCards';
export const searchInput = document.querySelector('.search__input');
export const deleteSearchBtn = document.querySelector('.search__cross');
const cards = document.querySelector('.cards');
console.log(cards);

export function clearInputSearch() {
    (searchInput as HTMLInputElement).value = '';
    (searchInput as HTMLInputElement).focus();
}

// export function searchCards() {
//     const requiredCards = new Set();
//     const cardsList = document.querySelectorAll('.card');
//     const cardsArr = Array.prototype.slice.call(cardsList);
//     const searchText = (searchInput as HTMLInputElement).value;

//     for (const card of cardsArr) {
//         const cardNameArr = card.dataset.collection.toLowerCase();
//         console.log(cardNameArr);
//         if (cardNameArr.includes(searchText)) {
//             requiredCards.add(card);
//         }
//     }

//     cards.innerHTML = null;
//     for (const card of requiredCards) {
//         cards.append(card as HTMLElement);
//     }
//     if ((searchInput as HTMLInputElement).value === '') {
//         returnCards();
//         // console.log('yeeeeeeees');
//     }
// }

export function searchCards() {
    const requiredCards: itemType[] = [];

    let cardsArr: itemType[];
    if (JSON.parse(localStorage.getItem('filteredCards'))) {
        cardsArr = JSON.parse(localStorage.getItem('filteredCards'));
    } else {
        cardsArr = itemArr;
    }
    let searchText;
    if (localStorage.getItem('searchText')) {
        searchText = localStorage.getItem('searchText');
        (searchInput as HTMLInputElement).value = localStorage.getItem('searchText');
        console.log('if');
    } else {
        searchText = (searchInput as HTMLInputElement).value;
        localStorage.setItem('searchText', `${searchText}`);

        console.log('else');
    }

    for (const card of cardsArr) {
        const cardNameArr = card.collection.toLowerCase();
        console.log(cardNameArr);
        if (cardNameArr.includes(searchText)) {
            requiredCards.push(card);
        }
    }
    sortFilteredCards(requiredCards);
    // chooseFilteredCards();
    if (!searchText) {
        console.log('dflvkfdkjbfjbjnjnnnnnnnnnnnnnnnnnnnnnnnn');
        returnCards();
        // console.log('yeeeeeeees');
    }
    if (requiredCards.length === 0) {
        cards.innerHTML = null;
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    }
}
export function searchWHilePrint() {
    const requiredCards: itemType[] = [];

    let cardsArr: itemType[];
    if (JSON.parse(localStorage.getItem('filteredCards'))) {
        cardsArr = JSON.parse(localStorage.getItem('filteredCards'));
    } else {
        cardsArr = itemArr;
    }
    const searchText = (searchInput as HTMLInputElement).value;
    localStorage.setItem('searchText', `${searchText}`);

    for (const card of cardsArr) {
        const cardNameArr = card.collection.toLowerCase();
        console.log(cardNameArr);
        if (cardNameArr.includes(searchText)) {
            requiredCards.push(card);
        }
    }
    sortFilteredCards(requiredCards);
    // chooseFilteredCards();
    if (!searchText) {
        console.log('dflvkfdkjbfjbjnjnnnnnnnnnnnnnnnnnnnnnnnn');
        returnCards();
        // console.log('yeeeeeeees');
    }
    if (requiredCards.length === 0) {
        cards.innerHTML = null;
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    }
}

function returnCards() {
    renderCard();
    chooseFilteredCards();
}
