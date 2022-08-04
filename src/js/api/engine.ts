import { START_STOP_CAR_URL } from '../constants';

export const driveCar = async (id: string, status: string, animation?: Animation) => {
    const response = await fetch(`${START_STOP_CAR_URL}?id=${id}&status=${status}`, {
        method: 'PATCH',
    });

    if (response.status === 500) {
        animation.pause();
    }

    let formatedesponse;

    if (status === 'started') {
        formatedesponse = await response.json();
    }
    if (status === 'drive') {
        formatedesponse = await response.text();
    }

    return formatedesponse;
};
