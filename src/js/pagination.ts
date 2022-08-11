import { getCars } from './api/car';
import { createTrack } from './garage';
import { store } from './store';
import { updateTable } from './tableWinners';
import { getWinners } from './api/winners';

const createPagination = () => {
    const main = document.querySelector('.main');
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('prev-btn');
    prevBtn.textContent = 'previous page';
    prevBtn.setAttribute('data-direction', 'previous');
    pagination.append(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next-btn');
    nextBtn.textContent = 'next page';
    nextBtn.setAttribute('data-direction', 'next');
    pagination.append(nextBtn);

    main.append(pagination);
};

export const registerPagination = () => {
    createPagination();
};

const tunePreviousBtn = async () => {
    const pageNum = document.querySelector('.page-num');
    const trackList = document.querySelector('.track-list');
    const hash = window.location.hash.slice(1);

    if (hash === 'garage' || hash === '') {
        if (store.pageNumGarage > 1) {
            store.pageNumGarage--;
            localStorage.setItem('pageNumGarage', String(store.pageNumGarage));
            pageNum.textContent = `page ${store.pageNumGarage}`;

            const carsData = await getCars(7, store.pageNumGarage);
            trackList.innerHTML = null;
            for (const car of carsData) {
                const track = createTrack(car);
                trackList.append(track);
            }
        }
    }
    if (hash === 'winners') {
        if (store.pageNumWinners > 1) {
            store.pageNumWinners--;
            localStorage.setItem('pageNumWinners', String(store.pageNumWinners));
            pageNum.textContent = `page ${store.pageNumWinners}`;

            updateTable();
        }
    }
};

export const changeNextBtn = async () => {
    const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
    const hash = window.location.hash.slice(1);

    if (hash === 'garage' || hash === '') {
        const testPage = await getCars(7, store.pageNumGarage + 1);
        if (testPage.length === 0) {
            nextBtn.disabled = true;
        }
    }
    if (hash === 'winners') {
        const testPage = await getWinners(10, store.pageNumWinners + 1);
        if (testPage.length === 0) {
            nextBtn.disabled = true;
        }
    }
};
const tuneNextBtn = async () => {
    const pageNum = document.querySelector('.page-num');
    const trackList = document.querySelector('.track-list');
    const hash = window.location.hash.slice(1);

    if (hash === 'garage' || hash === '') {
        if (store.pageNumGarage > 0) {
            store.pageNumGarage++;
            localStorage.setItem('pageNumGarage', String(store.pageNumGarage));
            pageNum.textContent = `page ${store.pageNumGarage}`;

            const carsData = await getCars(7, store.pageNumGarage);

            trackList.innerHTML = null;
            for (const car of carsData) {
                const track = createTrack(car);
                trackList.append(track);
            }
        }
    }
    if (hash === 'winners') {
        if (store.pageNumWinners > 0) {
            store.pageNumWinners++;
            localStorage.setItem('pageNumWinners', String(store.pageNumWinners));
            pageNum.textContent = `page ${store.pageNumWinners}`;

            updateTable();
        }
    }
    await changeNextBtn();
};

export const handlerPagination = (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.dataset.direction === 'previous') {
        tunePreviousBtn();
    }
    if (node.dataset.direction === 'next') {
        tuneNextBtn();
    }
};
