import { renderCardsAfterPopular } from './createCards';
import { sortPopularCards } from './sortCards';
export const filterPopular = document.querySelector('.popular .category__input');
const cards = document.querySelector('.cards');

export function isPopularChecked() {
    if (localStorage.getItem('popularChecked')) {
        (filterPopular as HTMLInputElement).checked = true;
        showPopularCards();
    } else {
        (filterPopular as HTMLInputElement).checked = false;
    }
}

export function showPopularCards() {
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
            return;
        }
        cards.innerHTML = null;
        for (const card of popularCards) {
            cards.append(card);
        }
        sortPopularCards(popularCards);
        localStorage.setItem('popularChecked', 'checked');
        return;
    }
    if (!(filterPopular as HTMLInputElement).checked) {
        renderCardsAfterPopular();
    }
}
