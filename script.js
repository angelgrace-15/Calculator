let currentNumber = "0";
let firstNumber = null;
let operator = null;
let startFresh = false;
let operatorJustPressed = false;
let memory = 0;

const resultBox = document.getElementById("display");
const expressionBox = document.getElementById("expression");

function showNumber() {
  resultBox.value = currentNumber;
}

function getSymbol(op) {
  if (op === "*") return "×";
  if (op === "/") return "÷";
  return op;
}

function cleanNumber(number) {
  return String(parseFloat(number.toPrecision(12)));
}

function isError() {
  return isNaN(Number(currentNumber));
}

function showError(message) {
  currentNumber = message;
  expressionBox.value = "";
  firstNumber = null;
  operator = null;
  startFresh = true;
  showNumber();
}

function doMath(a, op, b) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") {
    if (b === 0) return null;
    return a / b;
  }
}

function canGetVal(num) {
  if (operator === null) {
    expressionBox.value = "";
  }

  if (startFresh || currentNumber === "0") {
    currentNumber = String(num);
    startFresh = false;
  } else {
    currentNumber = currentNumber + num;
  }

  operatorJustPressed = false;
  showNumber();
}

function canGetDecimal() {
  if (operator === null) {
    expressionBox.value = "";
  }

  if (startFresh) {
    currentNumber = "0.";
    startFresh = false;
  } else if (!currentNumber.includes(".")) {
    currentNumber = currentNumber + ".";
  }

  operatorJustPressed = false;
  showNumber();
}

function canGetOperator(op) {
  if (isError()) return;

  if (operator !== null && !operatorJustPressed) {
    let answer = doMath(firstNumber, operator, Number(currentNumber));

    if (answer === null) {
      showError("Cannot divide by zero");
      return;
    }

    currentNumber = cleanNumber(answer);
    showNumber();
  }

  firstNumber = Number(currentNumber);
  operator = op;
  expressionBox.value = firstNumber + " " + getSymbol(op);
  startFresh = true;
  operatorJustPressed = true;
}

function canCalculate() {
  if (isError()) return;

  if (operator === null) {
    expressionBox.value = currentNumber + "=";
    startFresh = true;
    return;
  }

  let secondNumber = Number(currentNumber);
  let answer = doMath(firstNumber, operator, secondNumber);

  if (answer === null) {
    showError("Cannot divide by zero");
    return;
  }

  expressionBox.value = firstNumber + " " + getSymbol(operator) + " " + secondNumber + "=";
  currentNumber = cleanNumber(answer);

  firstNumber = null;
  operator = null;
  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function canClear() {
  currentNumber = "0";
  firstNumber = null;
  operator = null;
  startFresh = false;
  operatorJustPressed = false;
  expressionBox.value = "";
  showNumber();
}

function canClearEntry() {
  if (isError() || expressionBox.value.endsWith("=")) {
    canClear();
    return;
  }

  currentNumber = "0";
  startFresh = false;
  showNumber();
}

function canBackspace() {
  if (isError()) {
    canClear();
    return;
  }

  if (startFresh) return;

  currentNumber = currentNumber.slice(0, -1);

  if (currentNumber === "" || currentNumber === "-") {
    currentNumber = "0";
  }

  showNumber();
}

function canNegate() {
  if (isError() || currentNumber === "0") return;

  if (currentNumber.startsWith("-")) {
    currentNumber = currentNumber.slice(1);
  } else {
    currentNumber = "-" + currentNumber;
  }

  showNumber();
}

function canPercent() {
  if (isError()) return;

  if (firstNumber === null) {
    currentNumber = "0";
    expressionBox.value = "0";
  } else {
    let percent = (firstNumber * Number(currentNumber)) / 100;
    currentNumber = cleanNumber(percent);
    expressionBox.value = firstNumber + " " + getSymbol(operator) + " " + currentNumber;
  }

  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function canReciprocal() {
  if (isError()) return;

  let number = Number(currentNumber);

  if (number === 0) {
    showError("Cannot divide by zero");
    return;
  }

  expressionBox.value = "1/(" + number + ")";
  currentNumber = cleanNumber(1 / number);
  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function canSquare() {
  if (isError()) return;

  let number = Number(currentNumber);

  expressionBox.value = "sqr(" + number + ")";
  currentNumber = cleanNumber(number * number);
  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function canSqrt() {
  if (isError()) return;

  let number = Number(currentNumber);

  if (number < 0) {
    showError("Invalid input");
    return;
  }

  expressionBox.value = "√(" + number + ")";
  currentNumber = cleanNumber(Math.sqrt(number));
  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function memoryClear() {
  memory = 0;
}

function memoryRecall() {
  if (isError()) return;

  currentNumber = cleanNumber(memory);
  startFresh = true;
  operatorJustPressed = false;
  showNumber();
}

function memoryAdd() {
  if (isError()) return;

  memory = memory + Number(currentNumber);
  startFresh = true;
}

function memorySubtract() {
  if (isError()) return;

  memory = memory - Number(currentNumber);
  startFresh = true;
}

function memoryStore() {
  if (isError()) return;

  memory = Number(currentNumber);
  startFresh = true;
}
