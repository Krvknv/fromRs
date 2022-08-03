import { GET_CAR_URL } from '../constants';
import { store } from '../store';

export const getCars = async (limit: number, page: number) => {
    const response = await fetch(`${GET_CAR_URL}?_limit=${limit}&_page=${page}`);
    const jsonResponse = await response.json();

    // localStorage.setItem('carsQuantity', String(jsonResponse.length));
    return jsonResponse;
};

export const getAllCars = async () => {
    const allCars = await fetch(GET_CAR_URL);
    const allCarsJson = await allCars.json();
    return allCarsJson;
};
