export const btnResetAll = document.querySelector('.btn-reset-all');
export const btnResetFilters = document.querySelector('.btn-reset-filters');

export function resetAll() {
    localStorage.clear();
    location.reload();
}

export function resetFilters() {
    localStorage.removeItem('filters');
    localStorage.removeItem('popularChecked');
    localStorage.removeItem('yearStart');
    localStorage.removeItem('yearEnd');
    localStorage.removeItem('priceStart');
    localStorage.removeItem('priceEnd');
    localStorage.removeItem('searchText');

    location.reload();
}
