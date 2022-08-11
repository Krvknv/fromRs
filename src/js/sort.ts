import { createHeaderTable, createRow, selectWinners } from './tableWinners';

export const sortWinners = async (event: Event) => {
    const node = event.target as HTMLElement;
    const table = document.querySelector('.table');
    table.innerHTML = null;
    table.append(createHeaderTable());
    const winnersData = await selectWinners();

    const value = node.textContent.split(' ').at(-1);
    if (node.classList.contains('sort-win')) {
        if (value === 'increase') {
            winnersData.sort((a, b) => a.wins - b.wins);
            node.textContent = 'sort by wins decrease';
        }
        if (value === 'decrease') {
            winnersData.sort((a, b) => b.wins - a.wins);
            node.textContent = 'sort by wins increase';
        }
    }
    if (node.classList.contains('sort-time')) {
        if (value === 'increase') {
            winnersData.sort((a, b) => a.time - b.time);
            node.textContent = 'sort by best time decrease';
        }
        if (value === 'decrease') {
            winnersData.sort((a, b) => b.time - a.time);
            node.textContent = 'sort by best time increase';
        }
    }

    winnersData.forEach((item, index) => {
        const row = createRow(item, index);
        table.append(row);
    });
};
