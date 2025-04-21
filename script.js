let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'c':
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) return;
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case '.':
      if (!buffer.includes('.')) {
        buffer += '.';
      }
      break;
    case '±':
      buffer = (parseFloat(buffer) * -1).toString();
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') return;

  const intBuffer = parseFloat(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document.querySelector('.calc-buttons').addEventListener('click', function (event) {
    if (!event.target.closest('button')) return;
    const value = event.target.innerText.trim();
    buttonClick(value);
  });
}

init();
