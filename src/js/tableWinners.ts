import { getWinners } from './api/winners';
import { GET_CAR_URL } from './constants';
import { store } from './store';
import { createImgCar } from './svgCar';
import { TCar, TFullWinner, TWinner } from './types';

const createWinnersWrapper = () => {
    const winnerWrapper = document.createElement('div');
    winnerWrapper.classList.add('winner-wrapper');

    return winnerWrapper;
};

const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table');

    // const tableHead = document.createElement('tr');
    // tableHead.classList.add('table-head');
    // table.append(tableHead);

    // const number = document.createElement('th');
    // number.textContent = 'number';
    // tableHead.append(number);

    // const car = document.createElement('th');
    // car.textContent = 'car';
    // tableHead.append(car);

    // const name = document.createElement('th');
    // name.textContent = 'name';
    // tableHead.append(name);

    // const win = document.createElement('th');
    // win.textContent = 'win';
    // tableHead.append(win);

    // const bestTime = document.createElement('th');
    // bestTime.textContent = 'best time';
    // tableHead.append(bestTime);

    return table;
};
export const createHeaderTable = () => {
    // const table = createTable();

    const tableHead = document.createElement('tr');
    tableHead.classList.add('table-head');
    // table.append(tableHead);

    const number = document.createElement('th');
    number.textContent = 'number';
    tableHead.append(number);

    const car = document.createElement('th');
    car.textContent = 'car';
    tableHead.append(car);

    const name = document.createElement('th');
    name.textContent = 'name';
    tableHead.append(name);

    const win = document.createElement('th');
    win.textContent = 'win';
    tableHead.append(win);

    const bestTime = document.createElement('th');
    bestTime.textContent = 'best time';
    tableHead.append(bestTime);

    return tableHead;
};
export const createRow = (winnerData: TFullWinner) => {
    const row = document.createElement('tr');
    row.classList.add('table-row');

    const number = document.createElement('td');
    number.textContent = `1`;
    row.append(number);

    const car = document.createElement('td');
    car.classList.add('table-car-svg');
    car.innerHTML = createImgCar(winnerData.color);
    row.append(car);

    const name = document.createElement('td');
    name.textContent = winnerData.name;
    row.append(name);

    const win = document.createElement('td');
    win.textContent = `${winnerData.wins}`;
    row.append(win);

    const bestTime = document.createElement('td');
    bestTime.textContent = `${winnerData.time}s`;
    row.append(bestTime);

    return row;
};
const prepareData = (winners: TWinner[], cars: TCar[]) => {
    const carsObj: { [key: string]: TCar } = {};
    const resultArr: TFullWinner[] = [];

    cars.forEach((car) => {
        carsObj[car.id] = car;
    });

    winners.forEach((winner) => {
        const currentWinnerr = carsObj[winner.id];
        resultArr.push({ ...currentWinnerr, ...winner });
    });

    return resultArr;
};

export const selectWinners = async () => {
    const carsResponse = await fetch(GET_CAR_URL);
    const carsData = await carsResponse.json();

    const winnersData = await getWinners(10, store.pageNumWinners);

    const fullWinners = prepareData(winnersData, carsData);

    return fullWinners;
};

export const registerTable = async () => {
    const fullWinners = await selectWinners();
    const main = document.querySelector('.main');
    const table = createTable();
    const winnersWrapper = createWinnersWrapper();
    const tableHeader = createHeaderTable();

    table.append(tableHeader);

    winnersWrapper.append(table);

    main.append(winnersWrapper);

    for (const winner of fullWinners) {
        const row = createRow(winner);
        table.append(row);
    }
};

export const updateTable = async () => {
    const table = document.querySelector('.table');
    table.innerHTML = null;
    table.append(createHeaderTable());
    const winnersData = await selectWinners();
    for (const winner of winnersData) {
        const row = createRow(winner);
        table.append(row);
    }
};
