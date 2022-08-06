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

const createBtn = (className: string, text: string, id: number) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.textContent = text;
    btn.setAttribute('data-carId', `${id}`);

    return btn;
};

export const createTrack = (carData: TCar) => {
    const trackWrapper = document.createElement('div');
    trackWrapper.classList.add('track-wrapper');
    trackWrapper.setAttribute('data-carId', `${carData.id}`);

    const trackHeader = document.createElement('div');
    trackHeader.classList.add('track-header');
    trackWrapper.append(trackHeader);

    const btnSelect = createBtn('btn-select', 'select', carData.id);
    const btnRemove = createBtn('btn-remove', 'remove', carData.id);

    const carName = document.createElement('span');
    carName.classList.add('car-name');
    carName.textContent = carData.name;

    trackHeader.append(btnSelect, btnRemove, carName);

    const gameControls = document.createElement('div');
    gameControls.classList.add('game-controls');
    trackWrapper.append(gameControls);

    const btnA = createBtn('btn-a', 'a', carData.id);
    const btnB = createBtn('btn-b', 'b', carData.id);
    gameControls.append(btnA, btnB);

    const car = document.createElement('div');
    car.classList.add('car');
    car.setAttribute('data-carId', `${carData.id}`);

    const carSvg = createImgCar(carData.color);
    car.innerHTML = carSvg;

    trackWrapper.append(car);

    const flag = createFlag();
    flag.setAttribute('data-carId', `${carData.id}`);
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
