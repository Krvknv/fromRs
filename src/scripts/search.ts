import { renderCard, createCard } from './createCards';
import { chooseFilteredCards } from './filterCards';
import { itemType } from './types';
import { itemArr } from './itemArr';
import { sortFilteredCards } from './sortCards';
import { filterPopular, showPopularCards } from './filterPopular';
export const searchInput = document.querySelector('.search__input');
export const deleteSearchBtn = document.querySelector('.search__cross');
const cards = document.querySelector('.cards');

console.log(cards);

export function cleanInputSearch() {
    console.log('clean');
    (searchInput as HTMLInputElement).value = '';
    (searchInput as HTMLInputElement).focus();
    returnCards();
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
        console.log('chechkeeeeeeeed');

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
        localStorage.removeItem('searchText');
        // console.log('yeeeeeeees');
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
        console.log('chechkeeeeeeeed');

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
        localStorage.removeItem('searchText');

        // console.log('yeeeeeeees');
    }
    if (requiredCards.length === 0) {
        cards.innerHTML = null;
        cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
    }
}

function returnCards() {
    // renderCard();
    chooseFilteredCards();
    showPopularCards();
}
