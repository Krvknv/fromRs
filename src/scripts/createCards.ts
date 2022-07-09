import { itemArr } from './itemArr';
import { itemType } from './types';

const cards = document.querySelector('.cards');

const inBasket = JSON.parse(localStorage.getItem('inBasket')) || [];

function createCard(item: itemType) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <span class="card__popular">${item.ispopular ? 'popular' : ''}</span>
    <div class="card__img">
    <img src="${item.img}" alt="earrings" />
</div>
<span class="card__title">${item.collection}</span>
<ul class="card__list">
    <li class="card__item">
        <span class="card__prop">year</span>
        <span class="card__value">${item.year}</span>
    </li>
    <li class="card__item">
        <span class="card__prop">color</span>
        <span class="card__value">${item.color}</span>
    </li>
    <li class="card__item">
        <span class="card__prop">metal</span>
        <span class="card__value">${item.metal}</span>
    </li>
    <li class="card__item">
        <span class="card__prop">quantity</span>
        <span class="card__value">${item.quantity}</span>
    </li>
</ul>
<span class="card__price">${item.price}$</span>
<button id=${item.id} class="btn-add btn">${
        inBasket.includes(item.id) ? 'remove from basket' : 'add to basket'
    }</button>
    `;
    return card;
}

export function renderCard() {
    for (const item of itemArr) {
        const card = createCard(item);
        cards.append(card);
    }
}
