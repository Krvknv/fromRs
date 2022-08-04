import { store } from './store';
import { registerTable } from './tableWinners';

const createHeader = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = document.createElement('header');

    header.classList.add('header');
    body.append(header);
};

const createNavControls = () => {
    const header = document.querySelector('.header');

    const btns = document.createElement('div');
    btns.classList.add('btns');

    const garageBtn = document.createElement('a');
    garageBtn.classList.add('garage-btn');
    garageBtn.textContent = 'to garage';
    garageBtn.href = '#garage';

    const winnersBtn = document.createElement('a');
    winnersBtn.classList.add('winners-btn');
    winnersBtn.textContent = 'to winners';
    winnersBtn.href = '#winners';

    btns.append(garageBtn);
    btns.append(winnersBtn);

    header.append(btns);
};

export const handlerPageChanger = async () => {
    const pageNum = document.querySelector('.page-num');
    const quantity = document.querySelector('.quantity');
    const pageName = document.querySelector('.page-name');
    const options = document.querySelector('.options') as HTMLElement;
    const garageWrapper = document.querySelector('.garage-wrapper') as HTMLElement;
    const winnersWrapper = document.querySelector('.winner-wrapper') as HTMLElement;
    const hash = window.location.hash.slice(1);

    if (hash === 'garage' || hash === '') {
        // options.style.opacity = '1';
        // garageWrapper.style.opacity = '1';
        // winnersWrapper.style.opacity = '0';
        options.style.display = 'flex';
        garageWrapper.style.display = 'flex';
        winnersWrapper.style.display = 'none';

        pageName.textContent = 'garage';

        store.pageName = 'garage';

        // quantity.textContent = `${store.carsQuantity}`;
        quantity.textContent = `${localStorage.getItem('carsQuantity') || store.carsQuantity}`;

        pageNum.textContent = `page ${localStorage.getItem('pageNumGarage') || store.pageNumGarage}`;

        localStorage.setItem('place', 'garage');
    }

    if (hash === 'winners') {
        // table

        // options.style.opacity = '0';
        // garageWrapper.style.opacity = '0';
        // winnersWrapper.style.opacity = '1';
        options.style.display = 'none';
        garageWrapper.style.display = 'none';
        winnersWrapper.style.display = 'block';

        pageName.textContent = 'winners';

        store.pageName = 'winners';

        quantity.textContent = `${store.winnersQuantity}`;

        pageNum.textContent = `page ${localStorage.getItem('pageNumWinners') || store.pageNumWinners}`;

        localStorage.setItem('place', 'winners');
    }
};

// render func
export const registerNav = () => {
    createHeader();
    createNavControls();
};
