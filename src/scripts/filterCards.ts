import { itemType } from './types';
import { renderCard, createCard, renderCardsAfterPopular } from './createCards';
import { sortFilteredCards } from './sortCards';
import { sortPopularCards } from './sortCards';
import { searchCards } from './search';
import { sliderPrice, sliderYear } from './rangeFilterCards';
import { filterCards } from './rangeFilterCards';
import { showPopularCards } from './filterPopular';

const cards = document.querySelector('.cards');
export const formCollection = document.querySelectorAll('.collection .category__label .category__input');
export const formMetal = document.querySelectorAll('.metal .category__label .category__input');
export const formColor = document.querySelectorAll('.color .category__label .category__input');
export const filterPopular = document.querySelector('.popular .category__input');

// export function showPopularCards() {
//     console.log('showPop');
//     if ((filterPopular as HTMLInputElement).checked) {
//         const popularCards = [];
//         const cardsList = document.querySelectorAll('.card');
//         const cardsArr = Array.prototype.slice.call(cardsList);
//         for (const card of cardsArr) {
//             if (card.firstElementChild.textContent === 'popular') {
//                 popularCards.push(card);
//             }
//         }
//         if (popularCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//             // localStorage.setItem('noPopular', 'noPopular');
//             return;
//         }
//         // localStorage.removeItem('noPopular');
//         cards.innerHTML = null;
//         for (const card of popularCards) {
//             cards.append(card);
//         }
//         sortPopularCards(popularCards);
//         localStorage.setItem('popularChecked', 'checked');

//         return;
//     }
//     if (!(filterPopular as HTMLInputElement).checked) {
//         // cards.innerHTML = null;

//         renderCardsAfterPopular();

//         // chooseFilteredCardsAfterPopular();
//         // chooseFilteredCards();
//         // localStorage.removeItem('popularChecked');
//         localStorage.removeItem('popularChecked');

//         // localStorage.setItem('popularChecked', 'false');
//     }
// }

// export function showPopularCards() {
//     console.log('showPop');
//     if ((filterPopular as HTMLInputElement).checked) {
//         const popularCards = [];
//         let cardsList;
//         if (localStorage.getItem('filteredCards')) {
//             cardsList = JSON.parse(localStorage.getItem('filteredCards'));
//         } else if (
//             !localStorage.getItem('filteredCards') ||
//             sliderYear.noUiSlider.get() !== [2000, 2022] ||
//             sliderPrice.noUiSlider.get() !== [85, 260]
//         ) {
//             cardsList = JSON.parse(localStorage.getItem('rangeFilteredCards'));
//         }

//         for (const card of cardsList) {
//             if (card.ispopular) {
//                 popularCards.push(card);
//             }
//         }
//         if (popularCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//             // localStorage.setItem('noPopular', 'noPopular');
//             return;
//         }
//         // localStorage.removeItem('noPopular');
//         cards.innerHTML = null;
//         for (const card of popularCards) {
//             cards.append(card);
//         }
//         sortFilteredCards(popularCards);
//         localStorage.setItem('popularCards', JSON.stringify(popularCards));
//         localStorage.setItem('popularChecked', 'checked');

//         return;
//     }
//     if (!(filterPopular as HTMLInputElement).checked) {
//         cards.innerHTML = null;

//         renderCard();
//         // filterCards();
//         // chooseFilteredCards();
//         // localStorage.removeItem('popularChecked');
//         localStorage.removeItem('popularChecked');
//         localStorage.removeItem('popularCards');

//         // localStorage.setItem('popularChecked', 'false');
//     }
// }
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

        chooseFilteredCards();
        showPopularCards();
        searchCards();
    } else {
        filters = filters.filter((item) => {
            return item !== value;
        });

        localStorage.setItem('filters', JSON.stringify(filters));
        localStorage.removeItem('filteredCards');

        chooseFilteredCards();
        showPopularCards();
        searchCards();
    }
}

export function chooseFilteredCards() {
    console.log('chooseFilteredCards');
    if (filters.length === 0) {
        cards.innerHTML = null;
        renderCard();
        return;
    }

    const filteredCards: itemType[] = [];
    let rangeFilteredCardsArr;
    if (localStorage.getItem('popularCards')) {
        rangeFilteredCardsArr = JSON.parse(localStorage.getItem('popularCards'));
    } else {
        rangeFilteredCardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

        return;
    }
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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

        return;
    }
    if (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink')) {
        console.log('color');
        // if (!localStorage.getItem('noPopular')) {
        //     cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
        // }
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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

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
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
    }
}

// export function chooseFilteredCardsAfterPopular() {
//     if (filters.length === 0) {
//         cards.innerHTML = null;
//         renderCard();
//         return;
//     }

//     const filteredCards: itemType[] = [];
//     const rangeFilteredCardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
//     // if (localStorage.getItem('popularCards')) {
//     //     rangeFilteredCardsArr = JSON.parse(localStorage.getItem('popularCards'));
//     // } else {
//     //     rangeFilteredCardsArr = JSON.parse(localStorage.getItem('rangeFilteredCards'));
//     // }
//     if (
//         (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
//         (filters.includes('timeless elegance') ||
//             filters.includes('back to school') ||
//             filters.includes('milan') ||
//             filters.includes('portugal')) &&
//         (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (
//                 filters.includes(card.collection.toLowerCase()) &&
//                 filters.includes(card.metal.toLowerCase()) &&
//                 filters.includes(card.color.toLowerCase())
//             ) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }
//     if (
//         (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
//         (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.metal.toLowerCase()) && filters.includes(card.color.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
//         return;
//     }
//     if (
//         (filters.includes('timeless elegance') ||
//             filters.includes('back to school') ||
//             filters.includes('milan') ||
//             filters.includes('portugal')) &&
//         (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.collection.toLowerCase()) && filters.includes(card.color.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }
//     if (
//         (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
//         (filters.includes('timeless elegance') ||
//             filters.includes('back to school') ||
//             filters.includes('milan') ||
//             filters.includes('portugal')) &&
//         (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink'))
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (
//                 filters.includes(card.collection.toLowerCase()) &&
//                 filters.includes(card.metal.toLowerCase()) &&
//                 filters.includes(card.color.toLowerCase())
//             ) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }
//     if (
//         (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) &&
//         (filters.includes('timeless elegance') ||
//             filters.includes('back to school') ||
//             filters.includes('milan') ||
//             filters.includes('portugal'))
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.collection.toLowerCase()) && filters.includes(card.metal.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }
//     if (filters.includes('gold') || filters.includes('silver') || filters.includes('pink gold')) {
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.metal.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }
//     if (filters.includes('yellow') || filters.includes('grey') || filters.includes('pink')) {
//         console.log('color');
//         // if (!localStorage.getItem('noPopular')) {
//         //     cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         // }
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.color.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//             // showPopularCards();
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));

//         return;
//     }

//     if (
//         filters.includes('timeless elegance') ||
//         filters.includes('back to school') ||
//         filters.includes('milan') ||
//         filters.includes('portugal')
//     ) {
//         for (const card of rangeFilteredCardsArr) {
//             if (filters.includes(card.collection.toLowerCase())) {
//                 filteredCards.push(card);
//             }
//         }
//         if (filteredCards.length === 0) {
//             cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
//         } else {
//             sortFilteredCards(filteredCards);
//         }
//         localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
//     }
// }
