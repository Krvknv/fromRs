import { getCars } from './api/car';
import { store } from './store';
import { createImgCar } from './svgCar';
import { TCar } from './types';

const createGarageWrapper = () => {
    const main = document.querySelector('.main');
    const garaageWrapper = document.createElement('div');
    garaageWrapper.classList.add('garage-wrapper');
    main.append(garaageWrapper);

    return garaageWrapper;
};

const createTrackList = () => {
    const trackList = document.createElement('div');
    trackList.classList.add('track-list');

    return trackList;
};

const createFlag = () => {
    const flag = document.createElement('div');
    flag.classList.add('flag');

    return flag;
};

export const createTrack = (carData: TCar) => {
    const trackWrapper = document.createElement('div');
    trackWrapper.classList.add('track-wrapper');
    trackWrapper.setAttribute('data-carId', `${carData.id}`);

    const trackHeader = document.createElement('div');
    trackHeader.classList.add('track-header');
    trackWrapper.append(trackHeader);

    const btnSelect = document.createElement('button');
    btnSelect.classList.add('btn-select');
    btnSelect.textContent = 'select';
    btnSelect.setAttribute('data-carId', `${carData.id}`);
    trackHeader.append(btnSelect);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-remove');
    btnRemove.textContent = 'remove';
    trackHeader.append(btnRemove);

    const carName = document.createElement('span');
    carName.classList.add('car-name');
    carName.textContent = carData.name;
    trackHeader.append(carName);

    const gameControls = document.createElement('div');
    gameControls.classList.add('game-controls');
    trackWrapper.append(gameControls);

    const btnA = document.createElement('button');
    btnA.classList.add('btn-a');
    btnA.textContent = 'a';
    gameControls.append(btnA);

    const btnB = document.createElement('button');
    btnB.classList.add('btn-b');
    btnB.textContent = 'b';
    gameControls.append(btnB);

    const car = document.createElement('div');
    car.classList.add('car');

    const carSvg = createImgCar(carData.color);
    car.innerHTML = carSvg;

    trackWrapper.append(car);

    const flag = createFlag();
    trackWrapper.append(flag);

    return trackWrapper;
};

export const registerGarage = async () => {
    const carsData = await getCars(7, store.pageNumGarage);
    const garaageWrapper = createGarageWrapper();
    const trackList = createTrackList();

    garaageWrapper.append(trackList);

    for (const car of carsData) {
        const track = createTrack(car);
        trackList.append(track);
    }
};
