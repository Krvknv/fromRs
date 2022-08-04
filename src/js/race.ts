import { driveCar } from './api/engine';
import { store } from './store';

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
    store.animation = carAnimation;
    store.carId = value;
    driveCar(value, 'drive', carAnimation);
};

export const raceCar = (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.classList.contains('btn-a')) {
        const id = node.dataset.carid;
        const btnB = document.querySelector(`.btn-b[data-carid="${id}"]`) as HTMLButtonElement;
        btnB.disabled = false;
        node.disabled = true;

        // animation
        animmateRace(id);
    }
};

export const returnCar = (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.classList.contains('btn-b')) {
        const btnA = document.querySelector(`.btn-a[data-carid="${store.carId}"]`) as HTMLButtonElement;

        node.disabled = true;
        btnA.disabled = false;
        store.animation.cancel();
    }
};
