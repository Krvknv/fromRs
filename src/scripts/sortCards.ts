const cards = document.querySelector('.cards');
import { itemType } from './types';
import { itemArr } from './itemArr';
import { createCard } from './createCards';
import { filters } from './filterCards';
import { chooseFilteredCards } from './filterCards';
// import { formCollection } from './filterCards';
// // import { chooseFilteredCards } from './filterCards';
const select = document.querySelector('.sort__select');
const options = document.querySelectorAll('.sort__option');
// const cardsArr = Array.from(document.querySelectorAll('.card'));
import { filterCards } from './rangeFilterCards';

export function sortCard(event?: Event, sort?: string, cardsArr?: itemType[]) {
    // console.log('sort1');
    // if (filters) {
    //     chooseFilteredCards();
    //     return;
    // }
    const arr = itemArr;
    let value: string;
    if (!sort) {
        value = (select as HTMLSelectElement).value;
    } else {
        value = sort;
        options.forEach((item) => {
            if ((item as HTMLOptionElement).value === value) {
                (item as HTMLOptionElement).selected = true;
            }
        });
    }

    localStorage.setItem('sort', value);

    switch (value) {
        case 'Sort by name(from a to z)':
            arr.sort((a: itemType, b: itemType) => a.collection.charCodeAt(0) - b.collection.charCodeAt(0));
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }
            localStorage.setItem('sortedCards', JSON.stringify(arr));
            filterCards();
            chooseFilteredCards();
            break;
        case 'Sort by name(from z to a)':
            arr.sort((a: itemType, b: itemType) => b.collection.charCodeAt(0) - a.collection.charCodeAt(0));
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }

            localStorage.setItem('sortedCards', JSON.stringify(arr));
            filterCards();
            chooseFilteredCards();

            break;
        case 'Sort by year(in ascending order)':
            arr.sort((a: itemType, b: itemType) => a.year - b.year);
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }

            localStorage.setItem('sortedCards', JSON.stringify(arr));
            filterCards();
            chooseFilteredCards();

            break;
        case 'Sort by year(in descending order)':
            arr.sort((a: itemType, b: itemType) => b.year - a.year);
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }

            localStorage.setItem('sortedCards', JSON.stringify(arr));
            filterCards();
            chooseFilteredCards();

            break;
    }
}

export function sortFilteredCards(arr: itemType[]) {
    // console.log('sort2');

    const value: string = (select as HTMLSelectElement).value;

    switch (value) {
        case 'Sort by name(from a to z)':
            arr.sort((a: itemType, b: itemType) => a.collection.charCodeAt(0) - b.collection.charCodeAt(0));
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }

            break;
        case 'Sort by name(from z to a)':
            arr.sort((a: itemType, b: itemType) => b.collection.charCodeAt(0) - a.collection.charCodeAt(0));
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }
            break;
        case 'Sort by year(in ascending order)':
            arr.sort((a: itemType, b: itemType) => a.year - b.year);
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }

            break;
        case 'Sort by year(in descending order)':
            arr.sort((a: itemType, b: itemType) => b.year - a.year);
            cards.innerHTML = null;
            for (const item of arr) {
                const card = createCard(item);
                cards.append(card);
            }
            break;
    }
}
