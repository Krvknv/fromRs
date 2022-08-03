export type TCar = {
    id: number;
    color: string;
    name: string;
};

export type TWinner = {
    id: number;
    wins: number;
    time: number;
};

export type TFullWinner = {
    name: string;
    color: string;
    id: number;
    wins: number;
    time: number;
};

export type TStore = {
    pageName: string;
    pageNumGarage: number;
    pageNumWinners: number;
    carsQuantity: number;
    winnersQuantity: number;
    selectedCarId: string;
};
