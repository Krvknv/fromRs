import { getCars } from './api/car';
import { getWinners } from './api/winners';
import { createTrack } from './garage';
import { store } from './store';
import { createHeaderTable, createRow, registerTable, selectWinners, updateTable } from './tableWinners';
import { updateCar } from './updateCar';

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
    // const table = document.querySelector('.table');
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
            // table.innerHTML = null;
            // table.append(createHeaderTable());
            // const winnersData = await selectWinners();
            // for (const winner of winnersData) {
            //     const row = createRow(winner);
            //     table.append(row);
            // }
            // winnerWrapper.remove();
            // await registerTable();
            // console.log(store, 'prev');
        }
    }
};

const tuneNextBtn = async () => {
    // const table = document.querySelector('.table');
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
            // table.innerHTML = null;
            // table.append(createHeaderTable());
            // const winnersData = await selectWinners();
            // for (const winner of winnersData) {
            //     const row = createRow(winner);
            //     table.append(row);
            // }
            // winnerWrapper.remove();
            // await registerTable();
            // console.log(store, 'next');
        }
    }
};

export const handlerPagination = (event: Event) => {
    console.log('click');
    const node = event.target as HTMLElement;
    if (node.dataset.direction === 'previous') {
        tunePreviousBtn();
    }
    if (node.dataset.direction === 'next') {
        tuneNextBtn();
    }
};
