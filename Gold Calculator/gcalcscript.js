function updateGradient(x, y) {

    const normalizedX = x / window.innerWidth;
    const normalizedY = y / window.innerHeight;


    const offsetX = normalizedX * 20 - 10; 
    const offsetY = normalizedY * 20 - 10;

    const gradientContainer = document.querySelector('.gradient-container');
    gradientContainer.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
}


document.addEventListener('DOMContentLoaded', () => {
    
    setTimeout(() => {
        const container = document.querySelector('.container');
        container.classList.add('animated');
    }, 100);


    updateGradient(window.innerWidth / 2, window.innerHeight / 2);
    

    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    currentX = window.innerWidth / 2;
    currentY = window.innerHeight / 2;
    

    panelTargetX = 0;
    panelTargetY = 0;
    panelCurrentX = 0;
    panelCurrentY = 0;
});




const priceInput = document.getElementById('price');
const resultInput = document.getElementById('result');


let previousPriceValue = '';
let previousResultValue = '';


function preventNegativeSignWithRollback(inputElement, previousValueRef) {

    inputElement.addEventListener('focus', () => {
        previousValueRef.current = inputElement.value;
    });


    inputElement.addEventListener('input', () => {
        if (inputElement.value.includes('-')) {
            inputElement.value = previousValueRef.current;
            inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
        } else {
            previousValueRef.current = inputElement.value;
        }
    });


    inputElement.addEventListener('blur', () => {
        if (inputElement.value.includes('-')) {
            inputElement.value = previousValueRef.current;
        }
    });
}


const priceState = { current: '' };
const resultState = { current: '' };


preventNegativeSignWithRollback(priceInput, priceState);
preventNegativeSignWithRollback(resultInput, resultState);


function calculateFromPrice() {
    const price = parseFloat(priceInput.value);
    if (!isNaN(price)) {

        const result = price * 0.80;
        resultInput.value = result.toFixed(2);
    } else {
        resultInput.value = '';
    }
}


function calculateFromResult() {
    const result = parseFloat(resultInput.value);
    if (!isNaN(result)) {

        const price = result * 1.25;
        priceInput.value = price.toFixed(2);
    } else {
        priceInput.value = '';
    }
}


priceInput.addEventListener('input', calculateFromPrice);
resultInput.addEventListener('input', calculateFromResult);
