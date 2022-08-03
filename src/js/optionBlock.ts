const createOptionBlock = () => {
    const options = document.createElement('div');
    options.classList.add('options');

    return options;
};

const createBlockCreateCar = () => {
    const createCar = document.createElement('div');
    createCar.classList.add('create');

    const createName = document.createElement('input');
    createName.type = 'text';
    createName.classList.add('input-text');
    createCar.append(createName);

    const createColor = document.createElement('input');
    createColor.type = 'color';
    createColor.classList.add('input-color');
    createCar.append(createColor);

    const createBtn = document.createElement('button');
    createBtn.classList.add('create-btn');
    createBtn.textContent = 'create';
    createCar.append(createBtn);

    return createCar;
};

const createBlockUpdateCar = () => {
    const updateCar = document.createElement('div');
    updateCar.classList.add('update');

    const updateName = document.createElement('input');
    updateName.type = 'text';
    updateName.classList.add('input-text');
    updateName.disabled = true;
    updateCar.append(updateName);

    const updateColor = document.createElement('input');
    updateColor.type = 'color';
    updateColor.classList.add('input-color');
    updateColor.disabled = true;
    updateCar.append(updateColor);

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('update-btn');
    updateBtn.textContent = 'update';
    updateBtn.disabled = true;
    updateCar.append(updateBtn);

    return updateCar;
};

const createBlockControls = () => {
    const optionsBtns = document.createElement('div');
    optionsBtns.classList.add('btns');

    const raceBtn = document.createElement('button');
    raceBtn.classList.add('race-btn');
    raceBtn.textContent = 'race';
    optionsBtns.append(raceBtn);

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.textContent = 'reset';
    optionsBtns.append(resetBtn);

    const generateBtn = document.createElement('button');
    generateBtn.classList.add('generate-btn');
    generateBtn.textContent = 'generate cars';
    optionsBtns.append(generateBtn);

    return optionsBtns;
};

export const registerOptionBlock = () => {
    const main = document.querySelector('.main');
    const optionBlock = createOptionBlock();
    const blockCreateCar = createBlockCreateCar();
    const blockUpdateCar = createBlockUpdateCar();
    const blockControls = createBlockControls();

    optionBlock.append(blockCreateCar);
    optionBlock.append(blockUpdateCar);
    optionBlock.append(blockControls);

    main.append(optionBlock);
};
