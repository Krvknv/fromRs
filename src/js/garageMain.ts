const createMain = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = document.createElement('main');

    main.classList.add('main');
    body.append(main);
};

export const registerGarageMain = () => {
    createMain();
};
