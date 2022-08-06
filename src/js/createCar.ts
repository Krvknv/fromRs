import { getAllCars, getCars } from './api/car';
import { GET_CAR_URL } from './constants';
import { createTrack } from './garage';
import { store } from './store';

export const createCar = async () => {
    const trackList = document.querySelector('.track-list');
    const quantity = document.querySelector('.quantity');
    const nameInput = document.querySelector('.create  .input-text') as HTMLInputElement;
    const colorInput = document.querySelector('.create  .input-color') as HTMLInputElement;
    if (nameInput.value === '') {
        alert("Please enter car's name");
        return;
    }
    const car = {
        color: colorInput.value,
        name: nameInput.value,
    };
    const response = await fetch(GET_CAR_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });

    const allCars = await getAllCars();
    const carsQuantity = allCars.length;

    localStorage.setItem('carsQuantity', String(carsQuantity));

    quantity.textContent = `${carsQuantity}`;

    const carsData = await getCars(7, store.pageNumGarage);

    trackList.innerHTML = null;
    for (const carItem of carsData) {
        const track = createTrack(carItem);
        trackList.append(track);
    }
};
