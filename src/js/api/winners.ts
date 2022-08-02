import { GET_WINNERS_URL } from '../constants';

export const getWinners = async (limit: number, page: number) => {
    const response = await fetch(`${GET_WINNERS_URL}?_limit=${limit}&_page=${page}`);
    const jsonResponse = await response.json();
    return jsonResponse;
};
