import { GET_WINNERS_URL } from '../constants';
import { registerTable } from '../tableWinners';
import { TWinnerData } from '../types';

export const getWinners = async (limit: number, page: number) => {
    const response = await fetch(`${GET_WINNERS_URL}?_limit=${limit}&_page=${page}`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getAllWinners = async () => {
    const response = await fetch(GET_WINNERS_URL);
    const jsonResponse = await response.json();
    return jsonResponse;
};

const createWinner = async (data: TWinnerData) => {
    const winner = {
        id: data.carId,
        wins: 1,
        time: data.time / 1000,
    };

    const post = await fetch(GET_WINNERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
    });
};

export const postWinner = async (winnerData: TWinnerData) => {
    const response = await fetch(`${GET_WINNERS_URL}/${winnerData.carId}`);
    if (response.status === 404) {
        createWinner(winnerData);
    } else {
        const responseJson = await response.json();
        responseJson.wins++;
        if (responseJson.time > winnerData.time / 1000) {
            responseJson.time = winnerData.time / 1000;
        }

        const put = await fetch(`${GET_WINNERS_URL}/${winnerData.carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wins: responseJson.wins, time: responseJson.time }),
        });
    }
};
