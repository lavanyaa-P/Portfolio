const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let lastInputIsOperator = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'clear') {
      currentInput = '';
      display.textContent = '0';
      lastInputIsOperator = false;
      return;
    }

    if(button.id === 'equals') {
      try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let result = Function(`return ${expression}`)();
        display.textContent = Number.isFinite(result) ? result : 'Error';
        currentInput = result.toString();
        lastInputIsOperator = false;
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
      return;
    }

    if(button.hasAttribute('data-number')) {
      const num = button.getAttribute('data-number');

      if(num === '.') {
        const parts = currentInput.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        if(lastNumber.includes('.')) return;
      }

      currentInput += num;
      display.textContent = currentInput;
      lastInputIsOperator = false;
      return;
    }

    if(button.classList.contains('operator')) {
      if(currentInput === '') return;
      if(lastInputIsOperator) {
        currentInput = currentInput.slice(0, -1) + button.getAttribute('data-operator');
      } else {
        currentInput += button.getAttribute('data-operator');
        lastInputIsOperator = true;
      }
      display.textContent = currentInput;
    }
  });
});
