import { TStore } from './types';

export const createTitleBlock = (data: TStore) => {
    const main = document.querySelector('.main');
    const text = document.createElement('div');
    text.classList.add('text');

    const title = document.createElement('h1');
    title.classList.add('page-name');
    title.textContent = `${data.pageName}`;
    text.append(title);

    const quantity = document.createElement('span');
    quantity.classList.add('quantity');
    quantity.textContent = `${data.carsQuantity}`;
    text.append(quantity);

    const subTitle = document.createElement('h2');
    subTitle.classList.add('page-num');
    subTitle.textContent = 'page 1';
    text.append(subTitle);

    main.append(text);
};
