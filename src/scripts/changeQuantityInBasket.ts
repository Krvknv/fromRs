const basketNum = document.querySelector('.basket__num');

export function changeBasket(event: Event) {
    if ((event.target as HTMLElement).classList.contains('btn-add')) {
        if (+basketNum.textContent < 20) {
            changeQuantityInBskt(event.target);
            changeBtn(event.target);
        } else {
            alert('Извините, все слоты заполнены');
        }
    }
}

function changeBtn(btn: EventTarget) {
    if ((btn as HTMLElement).textContent === 'add to basket') {
        (btn as HTMLElement).textContent = 'remove from basket';
    } else {
        (btn as HTMLElement).textContent = 'add to basket';
    }
}

function changeQuantityInBskt(btn: EventTarget) {
    if ((btn as HTMLElement).textContent === 'add to basket') {
        basketNum.textContent = String(+basketNum.textContent + 1);
    } else {
        basketNum.textContent = String(+basketNum.textContent - 1);
    }
}
