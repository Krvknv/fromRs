import { START_STOP_CAR_URL } from '../constants';
import { TParams } from '../types';

export const driveCar = async (id: string, status: string, animation?: Animation, params?: TParams) => {
    const response = await fetch(`${START_STOP_CAR_URL}?id=${id}&status=${status}`, {
        method: 'PATCH',
    });

    if (response.status === 500) {
        animation.pause();
    }

    let formatedresponse;
    if (!params) {
        if (status === 'drive') {
            formatedresponse = await response.text();
        } else {
            formatedresponse = await response.json();
        }
    } else {
        formatedresponse = await response.json();
    }

    if (params) {
        if (status === 'drive') {
            formatedresponse.carId = id;
            formatedresponse.time = Math.trunc(params.distance / params.velocity);
        }
    }

    return formatedresponse;
};
