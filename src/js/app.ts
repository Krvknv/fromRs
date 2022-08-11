import { registerNav } from './nav';
import { registerGarageMain } from './garageMain';

import { handlerPageChanger } from './nav';
import { registerOptionBlock } from './optionBlock';
import { changeNextBtn, handlerPagination, registerPagination } from './pagination';
import { registerGarage } from './garage';
import { registerTable } from './tableWinners';
import { generateCars } from './generateCars';
import { createTitleBlock } from './titleBlock';
import { store } from './store';
import { createCar } from './createCar';
import { changeCar, updateCar } from './updateCar';
import { deleteCar } from './deleteCar';
import { raceCar, returnCar } from './race';
import { raceAllCars, resetAllCars } from './raceAllcars';
import { sortWinners } from './sort';

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

    // pagination
    await changeNextBtn();

    //
    // handlers

    // start app
    window.addEventListener('hashchange', handlerPageChanger);

    // generate cars
    const generateBtn = document.querySelector('.generate-btn');
    generateBtn.addEventListener('click', generateCars);

    // create car
    const createBtn = document.querySelector('.create-btn');
    createBtn.addEventListener('click', createCar);

    // pagination in garage
    const pagination = document.querySelector('.pagination');
    pagination.addEventListener('click', handlerPagination);

    // choode car for updating
    const trackList = document.querySelector('.track-list');
    trackList.addEventListener('click', updateCar);

    // update car
    const updateBtn = document.querySelector('.update-btn');
    updateBtn.addEventListener('click', changeCar);

    // deelte car
    trackList.addEventListener('click', deleteCar);

    // race car
    trackList.addEventListener('click', raceCar);
    trackList.addEventListener('click', returnCar);

    // race all car
    const raceBtn = document.querySelector('.race-btn');
    raceBtn.addEventListener('click', raceAllCars);

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', resetAllCars);

    // sort
    const btnSortWins = document.querySelector('.sort-win');
    const btnSorttime = document.querySelector('.sort-time');

    btnSortWins.addEventListener('click', sortWinners);
    btnSorttime.addEventListener('click', sortWinners);
};
