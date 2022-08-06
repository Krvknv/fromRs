import { TStore } from './types';

export const store: TStore = {
    pageName: localStorage.getItem('place') || 'garage',
    pageNumGarage: +localStorage.getItem('pageNumGarage') || 1,
    pageNumWinners: +localStorage.getItem('pageNumWinners') || 1,
    carsQuantity: +localStorage.getItem('carsQuantity') || 4,
    winnersQuantity: +localStorage.getItem('winnersQuantity') || 1,
    selectedCarId: '',
    carId: '',
    animation: null,
    animationArr: [],
    winnerNum: 0,
};
