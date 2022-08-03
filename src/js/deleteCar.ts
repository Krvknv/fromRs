import { getAllCars, getCars } from './api/car';
import { GET_CAR_URL } from './constants';
import { createTrack } from './garage';
import { store } from './store';
import { TCar } from './types';

// const findCar = async (node: HTMLElement) => {
//     const carsData = await getCars(7, store.pageNumGarage);
//     const car = carsData.find((item: TCar) => item.id === +node.dataset.carid);
//     return car;
// };

export const deleteCar = async (event: Event) => {
    const quantity = document.querySelector('.quantity');
    const trackList = document.querySelector('.track-list');
    const node = event.target as HTMLElement;
    if (node.classList.contains('btn-remove')) {
        // findCar(node);
        const id = +node.dataset.carid;

        const response = await fetch(`${GET_CAR_URL}/${id}`, {
            method: 'DELETE',
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
    }
};
