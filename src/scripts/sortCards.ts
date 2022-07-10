const cards = document.querySelector('.cards');
const select = document.querySelector('.sort__select');
const options = document.querySelectorAll('.sort__option');
const cardsArr = Array.from(document.querySelectorAll('.card'));

export function sortCard(event: Event, sort?: string) {
    let value: string;
    if (!sort) {
        value = (select as HTMLSelectElement).value;
    } else {
        value = sort;
        options.forEach((item) => {
            if ((item as HTMLOptionElement).value === value) {
                (item as HTMLOptionElement).selected = true;
            }
        });
    }

    localStorage.setItem('sort', value);

    switch (value) {
        case 'Sort by name(from a to z)':
            cardsArr.sort(
                (a, b) =>
                    (a as HTMLElement).dataset.collection.charCodeAt(0) -
                    (b as HTMLElement).dataset.collection.charCodeAt(0)
            );
            cards.innerHTML = null;
            cardsArr.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by name(from z to a)':
            cardsArr.sort(
                (a, b) =>
                    (b as HTMLElement).dataset.collection.charCodeAt(0) -
                    (a as HTMLElement).dataset.collection.charCodeAt(0)
            );
            cards.innerHTML = null;
            cardsArr.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by year(in ascending order)':
            cardsArr.sort((a, b) => +(a as HTMLElement).dataset.year - +(b as HTMLElement).dataset.year);
            cards.innerHTML = null;
            cardsArr.forEach((item) => cards.appendChild(item));
            break;
        case 'Sort by year(in descending order)':
            cardsArr.sort((a, b) => +(b as HTMLElement).dataset.year - +(a as HTMLElement).dataset.year);
            cards.innerHTML = null;
            cardsArr.forEach((item) => cards.appendChild(item));
            break;
    }
}
