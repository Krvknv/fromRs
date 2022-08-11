import { getCars } from './api/car';
import { driveCar } from './api/engine';
import { postWinner } from './api/winners';
import { store } from './store';
import { updateTable } from './tableWinners';
import { TCar, TWinnerData } from './types';

const animmateRace = async (value: string) => {
    const flag = document.querySelector(`.flag[data-carid="${value}"]`);

    const coords = flag.getBoundingClientRect();

    const params = await driveCar(value, 'started');
    const carAnimation = document
        .querySelector(`.car[data-carid="${value}"]`)
        .animate([{ transform: 'translateX(0)' }, { transform: `translateX(${coords.left + 20}px)` }], {
            duration: Math.trunc(params.distance / params.velocity),

            fill: 'forwards',
        });
    store.animationArr.push(carAnimation);
    return driveCar(value, 'drive', carAnimation, params);
};

const showWinner = async (winnerData: TWinnerData) => {
    const main = document.querySelector('.main');
    const carsData = await getCars(7, store.pageNumGarage);
    const winner = carsData.find((item: TCar) => item.id === +winnerData.carId);
    const winnerName = winner.name;

    const textWinner = document.createElement('div');
    textWinner.classList.add('winner-text');
    textWinner.textContent = `${winnerName}\nwin`;
    main.append(textWinner);
    setTimeout(() => {
        textWinner.remove();
    }, 2000);
};

const changeBtns = (value: boolean) => {
    const btnA = document.querySelectorAll('.btn-a');
    const btnB = document.querySelectorAll('.btn-b');

    btnA.forEach((item) => ((item as HTMLButtonElement).disabled = value));
    btnB.forEach((item) => ((item as HTMLButtonElement).disabled = value));
};
export const raceAllCars = async () => {
    changeBtns(true);

    const carsData = await getCars(7, store.pageNumGarage);
    const arr = [];
    for (const car of carsData) {
        arr.push(animmateRace(car.id));
    }
    const promise = await Promise.any(arr).catch(() => {
        console.log('All cars are stopped');
    });
    if (promise === undefined) {
        return;
    }
    showWinner(promise);
    postWinner(promise);

    updateTable();
};

export const resetAllCars = () => {
    const btnA = document.querySelectorAll('.btn-a');

    btnA.forEach((item) => ((item as HTMLButtonElement).disabled = false));

    for (const animate of store.animationArr) {
        animate.cancel();
    }

    store.animationArr = [];
    window.stop();
};
