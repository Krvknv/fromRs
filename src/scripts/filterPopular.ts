import { renderCardsAfterPopular } from './createCards';
import { filterCards } from './rangeFilterCards';
import { searchCards } from './search';
import { sortPopularCards } from './sortCards';
export const filterPopular = document.querySelector('.popular .category__input');
const cards = document.querySelector('.cards');
export function isPopularChecked() {
    console.log('isPop');

    if (localStorage.getItem('popularChecked')) {
        (filterPopular as HTMLInputElement).checked = true;
        showPopularCards();
    } else {
        (filterPopular as HTMLInputElement).checked = false;
    }
}
export function showPopularCards() {
    console.log('showPop');
    if ((filterPopular as HTMLInputElement).checked) {
        const popularCards = [];
        const cardsList = document.querySelectorAll('.card');
        const cardsArr = Array.prototype.slice.call(cardsList);
        for (const card of cardsArr) {
            if (card.firstElementChild.textContent === 'popular') {
                popularCards.push(card);
            }
        }
        if (popularCards.length === 0) {
            cards.innerHTML = '<span class="no-found">Sorry, there was no match</span>';
            // localStorage.setItem('noPopular', 'noPopular');
            return;
        }
        // localStorage.removeItem('noPopular');
        cards.innerHTML = null;
        for (const card of popularCards) {
            cards.append(card);
        }
        sortPopularCards(popularCards);
        localStorage.setItem('popularChecked', 'checked');

        return;
    }
    if (!(filterPopular as HTMLInputElement).checked) {
        // cards.innerHTML = null;

        renderCardsAfterPopular();
        // searchCards();
        // chooseFilteredCardsAfterPopular();
        // chooseFilteredCards();
        // localStorage.removeItem('popularChecked');

        // localStorage.setItem('popularChecked', 'false');
    }
}
