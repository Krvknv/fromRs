import { createHeaderTable, createRow, selectWinners } from './tableWinners';

export const sortWinners = async (event: Event) => {
    const node = event.target as HTMLElement;
    const table = document.querySelector('.table');
    table.innerHTML = null;
    table.append(createHeaderTable());
    const winnersData = await selectWinners();
    if (node.classList.contains('sort-win')) {
        winnersData.sort((a, b) => a.wins - b.wins);
    }
    if (node.classList.contains('sort-time')) {
        winnersData.sort((a, b) => a.time - b.time);
    }

    winnersData.forEach((item, index) => {
        const row = createRow(item, index);
        table.append(row);
    });
    // for (const winner of winnersData) {
    //     const row = createRow(winner);
    //     table.append(row);
    // }
};
