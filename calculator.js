function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    return a / b;
  }
  

  let firstNumber = null;
  let operator = null;
  let waitingForSecondNumber = false;
  
  function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
      case '×':
        return multiply(a, b);
      case '/':
      case '÷':
        return divide(a, b);
      default:
        return null;
    }
  }
  
  const display = document.getElementById('display');
  const numberButtons = document.querySelectorAll('[data-number]');
  const clearButton = document.querySelector('[data-action="clear"]');
  const operatorButtons = document.querySelectorAll('[data-action="add"], [data-action="subtract"], [data-action="multiply"], [data-action="divide"]');
  const equalsButton = document.querySelector('[data-action="equals"]');
  
  let displayValue = '0';
  
  function updateDisplay() {
    display.textContent = displayValue;
  }
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (displayValue === '0' || waitingForSecondNumber) {
        displayValue = button.textContent;
        waitingForSecondNumber = false;
      } else {
        displayValue += button.textContent;
      }
      updateDisplay();
    });
  });
  
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (operator && waitingForSecondNumber) {
        
        operator = button.textContent;
        return;
      }
      if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);
      } else if (operator) {
        const result = operate(operator, firstNumber, parseFloat(displayValue));
        displayValue = String(result);
        firstNumber = result;
        updateDisplay();
      }
      operator = button.textContent;
      waitingForSecondNumber = true;
    });
  });
  
  equalsButton.addEventListener('click', () => {
    if (operator && firstNumber !== null && !waitingForSecondNumber) {
      const secondNumber = parseFloat(displayValue);
      let result = operate(operator, firstNumber, secondNumber);
  
      
      if ((operator === '÷' || operator === '/') && secondNumber === 0) {
        displayValue = '¡No se puede dividir por 0!';
        updateDisplay();
        
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        return;
      }
  
      
      if (typeof result === 'number' && !Number.isInteger(result)) {
        result = Math.round(result * 100000) / 100000;
      }
  
      displayValue = String(result);
      updateDisplay();
      firstNumber = result;
      operator = null;
      waitingForSecondNumber = true;
    }
  });
  
  clearButton.addEventListener('click', () => {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
  });
  
  updateDisplay();

  const decimalButton = document.querySelector('[data-action="decimal"]');
const backspaceButton = document.querySelector('[data-action="backspace"]'); 

decimalButton.addEventListener('click', () => {
  if (displayValue.includes('.')) return;
  if (waitingForSecondNumber) {
    displayValue = '0.';
    waitingForSecondNumber = false;
  } else {
    displayValue += '.';
  }
  updateDisplay();
});

backspaceButton.addEventListener('click', () => {
  if (displayValue.length === 1 || (displayValue.length === 2 && displayValue.startsWith('-'))) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
  
    
    if (!isNaN(key)) {
      const button = document.querySelector(`[data-number="${key}"]`);
      if (button) button.click();
    }
  
    
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      let op = key;
      if (key === '*') op = '×';
      if (key === '/') op = '÷';
      const button = Array.from(operatorButtons).find(btn => btn.textContent === op);
      if (button) button.click();
    }
  
    
    if (key === '=' || key === 'Enter') {
      if (equalsButton) equalsButton.click();
    }
  
    
    if (key === '.') {
      if (decimalButton) decimalButton.click();
    }
  
    
    if (key === 'Backspace') {
      if (backspaceButton) backspaceButton.click();
    }
  
    
    if (key.toLowerCase() === 'c' || key === 'Escape') {
      if (clearButton) clearButton.click();
    }
  });