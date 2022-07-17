const basketNum = document.querySelector('.basket__num');
basketNum.textContent = localStorage.getItem('quantityInBskt') || '0';
export function changeBasket(event: Event) {
    if ((event.target as HTMLElement).classList.contains('btn-add')) {
        if (+basketNum.textContent < 20) {
            changeQuantityInBskt(event.target);
            localStorage.setItem('quantityInBskt', basketNum.textContent);
            changeBtn(event.target);
        } else {
            alert('Sorry, all slots are full');
        }
    }
}
let inBasket: number[] = [];
function changeBtn(btn: EventTarget) {
    if ((btn as HTMLElement).textContent === 'add to basket') {
        (btn as HTMLElement).textContent = 'remove from basket';
        inBasket.push(+(btn as HTMLElement).id);
        localStorage.setItem('inBasket', JSON.stringify(inBasket));
    } else {
        (btn as HTMLElement).textContent = 'add to basket';
        inBasket = inBasket.filter((item) => item !== +(btn as HTMLElement).id);
        localStorage.setItem('inBasket', JSON.stringify(inBasket));
    }
}

function changeQuantityInBskt(btn: EventTarget) {
    if ((btn as HTMLElement).textContent === 'add to basket') {
        basketNum.textContent = String(+basketNum.textContent + 1);
    } else {
        basketNum.textContent = String(+basketNum.textContent - 1);
    }
}
