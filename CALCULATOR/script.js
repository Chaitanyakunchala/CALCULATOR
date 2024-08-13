// script.js

let display = document.getElementById('display');
let currentInput = '';
let currentOperation = null;
let previousInput = '';
let shouldResetInput = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            inputNumber(value);
        } else if (value === 'AC') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (['÷', '×', '−', '+'].includes(value)) {
            setOperation(value);
        } else if (value === '.') {
            inputDecimal();
        }
    });
});

function inputNumber(number) {
    if (shouldResetInput) {
        currentInput = number;
        shouldResetInput = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function clear() {
    currentInput = '0';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}

function setOperation(operation) {
    if (currentOperation !== null) calculate();
    previousInput = currentInput;
    currentOperation = operation;
    shouldResetInput = true;
}

function calculate() {
    if (currentOperation === null || shouldResetInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
    }

    currentInput = result.toString();
    currentOperation = null;
    shouldResetInput = true;
    updateDisplay();
}

function inputDecimal() {
    if (shouldResetInput) {
        currentInput = '0.';
        shouldResetInput = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') inputNumber(event.key);
    if (event.key === '.') inputDecimal();
    if (event.key === '=' || event.key === 'Enter') calculate();
    if (event.key === 'Backspace') clear();
    if (event.key === '+') setOperation('+');
    if (event.key === '-') setOperation('−');
    if (event.key === '*') setOperation('×');
    if (event.key === '/') setOperation('÷');
});

updateDisplay();