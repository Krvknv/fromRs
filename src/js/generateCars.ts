import { getCars } from './api/car';
import { GET_CAR_URL } from './constants';
import { createTrack } from './garage';
import { store } from './store';

const brands = [
    'opel',
    'BMW',
    'audi',
    'kia',
    'scoda',
    'datsun',
    'nissan',
    'infiniti',
    'volkswagen',
    'mazda',
    'Toyota',
    'renault',
    'chevrolet',
    'tesla',
];

const models = [
    'solaris',
    'elantra',
    'sonata',
    'camry',
    'corolla',
    'supra',
    'i30',
    'land',
    'XT5',
    'rio',
    'nexia',
    'spark',
    's4',
];

const colors = [
    '#73055D',
    '#FAF8F5',
    '#E08E45',
    '#F8F4A6',
    '#241E4E',
    '#66999B',
    '#B3AF8F',
    '#631D76',
    '#D62828',
    '#E8CEE4',
    '#59C3C3',
    '#009DDC',
    '#AED9E0',
    '#74a317',
    '#D4BEBE',
    '#FF6B6C',
    '#3A5743',
    '#3B7080',
];

export const generateName = () => {
    const brandIndex = Math.floor(Math.random() * (brands.length - 1 - 0 + 1));
    const modelIndex = Math.floor(Math.random() * (models.length - 1 - 0 + 1));

    const newName = `${brands[brandIndex]}-${models[modelIndex]}`;

    return newName;
};

export const generateColor = () => {
    const colorIndex = Math.floor(Math.random() * (colors.length - 1 - 0 + 1));

    const color = colors[colorIndex];
    return color;
};

export const generateCars = async () => {
    const trackList = document.querySelector('.track-list');
    const quantity = document.querySelector('.quantity');
    for (let i = 0; i < 100; i++) {
        const name = generateName();
        const color = generateColor();

        const car = {
            color,
            name,
        };

        const response = await fetch(GET_CAR_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
    }

    const allCars = await fetch(GET_CAR_URL);
    const allCarsJson = await allCars.json();

    const carsQuantity = allCarsJson.length;

    localStorage.setItem('carsQuantity', String(carsQuantity));

    quantity.textContent = `${carsQuantity}`;

    const carsData = await getCars(7, store.pageNumGarage);

    trackList.innerHTML = null;
    for (const car of carsData) {
        const track = createTrack(car);
        trackList.append(track);
    }
};
