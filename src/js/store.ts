export const store = {
    pageName: localStorage.getItem('place') || 'garage',
    pageNumGarage: +localStorage.getItem('pageNumGarage') || 1,
    pageNumWinners: 1,
    carsQuantity: +localStorage.getItem('carsQuantity') || 4,
    winnersQuantity: +localStorage.getItem('winnersQuantity') || 1,
};
