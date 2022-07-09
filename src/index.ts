import './assets/styles/main.scss';
import './assets/styles/style.css';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { renderCard } from './scripts/createCards';

import { changeBasket } from './scripts/changeQuantityInBasket';

const sliderYear = document.getElementById('slider-year');
const sliderQuantity = document.getElementById('slider-quantity');

const cards = document.querySelector('.cards');

noUiSlider.create(sliderYear, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
});
noUiSlider.create(sliderQuantity, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
});

// import { itemArr } from './scripts/itemArr';
renderCard();

cards.addEventListener('click', changeBasket);
const select = document.querySelector('.sort__select');
const items = Array.from(document.querySelectorAll('.card'));

// import { itemType } from './scripts/types';

// select.addEventListener('change', function (e) {
//     // console.log("Changed to: " + e.target.value)
//     console.log((e.target as HTMLSelectElement).value, 'change');
// });
select.addEventListener('change', sortCard);

// for (const item of items) {
//     console.log(item);
// }

function sortCard(event: Event) {
    // console.log((event.target as HTMLSelectElement).value, 'change');
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
        case 'Sort by name(from a to z)':
            items.sort(
                (a, b) =>
                    (a as HTMLElement).dataset.collection.charCodeAt(0) -
                    (b as HTMLElement).dataset.collection.charCodeAt(0)
            );
            cards.innerHTML = null;
            items.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by name(from z to a)':
            items.sort(
                (a, b) =>
                    (b as HTMLElement).dataset.collection.charCodeAt(0) -
                    (a as HTMLElement).dataset.collection.charCodeAt(0)
            );
            cards.innerHTML = null;
            items.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by year(in ascending order)':
            items.sort((a, b) => +(a as HTMLElement).dataset.year - +(b as HTMLElement).dataset.year);
            cards.innerHTML = null;
            items.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by year(in descending order)':
            items.sort((a, b) => +(b as HTMLElement).dataset.year - +(a as HTMLElement).dataset.year);
            cards.innerHTML = null;
            items.forEach((item) => cards.appendChild(item));
            break;

        // case 'Sort by name(from z to a)':  // if (x === 'value2')
        //   ...
        //   [break]
        // case 'Sort by year(in ascending order)':  // if (x === 'value2')
        //   ...
        //   [break]
        // case 'Sort by year(in descending order)':  // if (x === 'value2')
        //   ...
        //   [break]

        // default:
        //   ...
        //   [break]
    }
}
