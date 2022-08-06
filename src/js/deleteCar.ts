import { getAllCars, getCars } from './api/car';
import { GET_CAR_URL, GET_WINNERS_URL } from './constants';
import { createTrack } from './garage';
import { store } from './store';
import { showWinnersQuantity, updateTable } from './tableWinners';

const deleteWinner = async (id: number) => {
    const response = await fetch(`${GET_WINNERS_URL}/${id}`, {
        method: 'DELETE',
    });
    if (response.status === 200) {
        const winnersQuantity = showWinnersQuantity();
        localStorage.setItem('winnersQuantity', String(winnersQuantity));

        updateTable();
    }
};

export const deleteCar = async (event: Event) => {
    const quantity = document.querySelector('.quantity');
    const trackList = document.querySelector('.track-list');
    const node = event.target as HTMLElement;
    if (node.classList.contains('btn-remove')) {
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

        deleteWinner(id);
    }
};
