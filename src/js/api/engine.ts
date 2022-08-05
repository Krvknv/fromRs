import { START_STOP_CAR_URL } from '../constants';
// import { controller } from '../store';
import { TCar, TParams } from '../types';

export const driveCar = async (id: string, status: string, animation?: Animation, params?: TParams) => {
    // try {
    const response = await fetch(`${START_STOP_CAR_URL}?id=${id}&status=${status}`, {
        method: 'PATCH',
    });

    if (response.status === 500) {
        animation.pause();
    }
    // const formatedresponse = await response.json();
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
    // } catch (error) {}
};

// export const getAllparams = async (cars: TCar[]) => {
//     const fetchArr = [];
//     for (const car of cars) {
//         fetchArr.push(
//             fetch(`${START_STOP_CAR_URL}?id=${car.id}&status=started`, {
//                 method: 'PATCH',
//             })
//         );
//     }
//     const responseArr = [];
//     const promises = await Promise.all(fetchArr);
//     for (const promise of promises) {
//         const response = await promise.json();
//         responseArr.push(response);
//     }
//     return responseArr;
// };
