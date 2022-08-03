import { registerNav } from './nav';
import { registerGarageMain } from './garageMain';

import { handlerPageChanger } from './nav';
import { registerOptionBlock } from './optionBlock';
import { handlerPagination, registerPagination } from './pagination';
import { registerGarage } from './garage';
import { registerTable } from './tableWinners';
import { generateCars } from './generateCars';
import { createTitleBlock } from './titleBlock';
import { store } from './store';
import { createCar } from './createCar';
import { changeCar, updateCar } from './updateCar';

export const startApp = async () => {
    // navigate controls
    registerNav();

    // garage wrapper
    await registerGarageMain();

    // options controls
    await registerOptionBlock();
    // text block
    await createTitleBlock(store);
    // garage
    await registerGarage();
    // table
    await registerTable();
    // pagination
    registerPagination();
    // show right page
    handlerPageChanger();
    // handlers
    window.addEventListener('hashchange', handlerPageChanger);

    const gameControls = document.querySelector('.game-controls');

    gameControls.addEventListener('click', (event) => {
        if ((event.target as HTMLElement).classList.contains('btn-a')) {
            console.log('a');
        }
        if ((event.target as HTMLElement).classList.contains('btn-b')) {
            console.log('b');
        }
    });

    const generateBtn = document.querySelector('.generate-btn');
    generateBtn.addEventListener('click', generateCars);

    const createBtn = document.querySelector('.create-btn');
    createBtn.addEventListener('click', createCar);

    const pagination = document.querySelector('.pagination');
    pagination.addEventListener('click', handlerPagination);

    const trackList = document.querySelector('.track-list');
    trackList.addEventListener('click', updateCar);

    const updateBtn = document.querySelector('.update-btn');
    updateBtn.addEventListener('click', changeCar);
};
