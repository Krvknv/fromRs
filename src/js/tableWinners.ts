import { getAllWinners, getWinners } from './api/winners';
import { GET_CAR_URL } from './constants';
import { store } from './store';
import { createImgCar } from './svgCar';
import { TCar, TFullWinner, TWinner } from './types';

export const showWinnersQuantity = async () => {
    const winners = await getAllWinners();
    const winnersQuantity = winners.length;

    return winnersQuantity;
};

const createWinnersWrapper = () => {
    const winnerWrapper = document.createElement('div');
    winnerWrapper.classList.add('winner-wrapper');

    return winnerWrapper;
};

const createSortBtn = (className: string, text: string) => {
    const btn = document.createElement('button');
    btn.classList.add(`${className}`);
    btn.textContent = `${text}`;

    return btn;
};

const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table');

    return table;
};

export const createHeaderTable = () => {
    const tableHead = document.createElement('tr');
    tableHead.classList.add('table-head');

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

export const createRow = (winnerData: TFullWinner, index: number) => {
    const row = document.createElement('tr');
    row.classList.add('table-row');

    const number = document.createElement('td');
    const plus = store.pageNumWinners === 1 ? 0 : store.pageNumWinners * 10 - 10;
    number.textContent = `${index + 1 + plus}`;
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
    const btnSortByWins = createSortBtn('sort-win', 'sort  by wins');
    const btnSortBytime = createSortBtn('sort-time', 'sort  by best time');

    winnersWrapper.append(btnSortByWins, btnSortBytime);
    table.append(tableHeader);

    winnersWrapper.append(table);

    main.append(winnersWrapper);

    fullWinners.forEach((item, index) => {
        const row = createRow(item, index);
        table.append(row);
    });
};

export const updateTable = async () => {
    const table = document.querySelector('.table');
    table.innerHTML = null;
    table.append(createHeaderTable());
    const winnersData = await selectWinners();

    winnersData.forEach((item, index) => {
        const row = createRow(item, index);
        table.append(row);
    });
};
