import { getCars } from './api/car';
import { GET_CAR_URL } from './constants';
import { createTrack } from './garage';
import { store } from './store';
import { TCar } from './types';

const changeOptions = (value: boolean) => {
    const nameInput = document.querySelector('.update > .input-text') as HTMLInputElement;
    const colorInput = document.querySelector('.update > .input-color') as HTMLInputElement;
    const updateBtn = document.querySelector('.update-btn') as HTMLButtonElement;

    nameInput.disabled = value;
    colorInput.disabled = value;
    updateBtn.disabled = value;
};

const changeStyles = (event: Event) => {
    const nameInput = document.querySelector('.update > .input-text') as HTMLInputElement;

    const btnSelect = event.target as HTMLElement;
    const block = btnSelect.parentElement.parentElement;

    if (nameInput.disabled) {
        changeOptions(false);

        block.style.border = '2px solid #41436A';
    } else {
        changeOptions(true);

        block.style.border = 'none';
        block.style.borderBottom = '2px dashed #fff';
    }
};

export const updateCar = (event: Event) => {
    if ((event.target as HTMLElement).classList.contains('btn-select')) {
        store.selectedCarId = (event.target as HTMLElement).dataset.carid;
        changeStyles(event);
    }
};

const findCar = async () => {
    const carsData = await getCars(7, store.pageNumGarage);
    const car = carsData.find((item: TCar) => item.id === +store.selectedCarId);
    return car;
};

export const changeCar = async () => {
    const trackList = document.querySelector('.track-list');
    const nameInput = document.querySelector('.update > .input-text') as HTMLInputElement;
    const colorInput = document.querySelector('.update > .input-color') as HTMLInputElement;
    const tracksArr = document.querySelectorAll('.track-wrapper');
    if (nameInput.value === '') {
        alert("Please enter car's name");
        return;
    }
    const car = await findCar();

    car.color = colorInput.value;
    car.name = nameInput.value;

    tracksArr.forEach((item) => {
        (item as HTMLElement).style.border = 'none';
        (item as HTMLElement).style.borderBottom = '2px dashed #fff';
    });

    const response = await fetch(`${GET_CAR_URL}/${store.selectedCarId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });

    const carsData = await getCars(7, store.pageNumGarage);
    trackList.innerHTML = null;
    for (const carItem of carsData) {
        const track = createTrack(carItem);
        trackList.append(track);
    }
    nameInput.value = '';

    changeOptions(true);
};
