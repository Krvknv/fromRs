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
    carId: string;
    animation: Animation | null;
    animationArr: Animation[];
    winnerNum: number;
};

export type TWinnerData = {
    success: boolean;
    carId: string;
    time: number;
};

export type TParams = {
    velocity: number;
    distance: number;
};
