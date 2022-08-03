import { getCars } from './api/car';
import { createTrack } from './garage';
import { store } from './store';

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
};

const tuneNextiousBtn = async () => {
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
};

export const handlerPagination = (event: Event) => {
    const node = event.target as HTMLElement;
    if (node.dataset.direction === 'previous') {
        tunePreviousBtn();
    }
    if (node.dataset.direction === 'next') {
        tuneNextiousBtn();
    }
};
