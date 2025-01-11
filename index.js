// Set global strict mode
"use strict";

// Create key buttons
let keypad = document.querySelector(".keypad");

let keys = [7, 8, 9, "÷", 4, 5, 6, "x", 1, 2, 3, "-", 0, "=", "+"];

for (let key of keys) {
  console.log(key);
}

keys.forEach((key) => {
  let button = document.createElement("button");
  button.textContent = key;
  button.classList.add("keys");
  if (button.textContent == "=") {
    let reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.classList.add("keys");
    keypad.appendChild(reset);
  }
  keypad.appendChild(button);
});

// Global variables

let displayNumber = 0;
let operationNumber = 0;
let mode = "equals";

// Set display to 0
const display = document.querySelector("#digits");
clear();

function updateText(text, element) {
  if (element.classList.contains("tiny")) {
    element.classList.toggle("tiny");
  }
  element.textContent = text;
}

function updateTinyText(text, element) {
  element.textContent = text;
  element.classList.toggle("tiny");
}

function showOperation() {
  updateDisplay(0);
}

function updateDisplay(number) {
  if (number > 9999999999999) {
    clear();
    updateTinyText("Number to big", display);
  } else if (mode == "equals") {
    displayNumber = Number.parseInt(number);
    updateText(displayNumber.toLocaleString(), display);
  } else {
    operationNumber = Number.parseInt(number);
    updateText(operationNumber.toLocaleString(), display);
  }
}

function clear() {
  mode = "equals";
  displayNumber = 0;
  operationNumber = 0;
  updateText(displayNumber, display);
}

// Clear display

document.addEventListener("keypress", (event) => {
  if ((event.key == "c" && event.ctrlKey) || event.key == "c") {
    clear();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    if (mode == "equals") {
      if (displayNumber > 9) {
        let numberString = displayNumber.toString();
        numberString = numberString.slice(0, numberString.length - 1);
        updateDisplay(numberString);
      }
    } else {
      if (operationNumber > 9) {
        let numberString = operationNumber.toString();
        numberString = numberString.slice(0, numberString.length - 1);
        updateDisplay(numberString);
      }
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.nodeName == "BUTTON") {
    let key = event.target.textContent;
    if (!isNaN(key)) {
      if (mode == "equals") {
        displayNumber == 0
          ? updateDisplay(key)
          : updateDisplay(`${displayNumber}${key}`);
        console.log(`Display number is ${displayNumber}`);
      } else {
        operationNumber == 0
          ? updateDisplay(key)
          : updateDisplay(`${operationNumber}${key}`);
        console.log(`Operation number is ${operationNumber}`);
      }
    } else {
      switch (key) {
        case "+":
          console.log("plus");
          add();
          break;
        case "-":
          console.log("minus");
          subtract();
          break;
        case "x":
          console.log("times");
          multiply();
          break;
        case "÷":
          console.log("divide");
          divide();
          break;
        case "=":
          console.log("equals");
          equals();
          break;
        case "Reset":
          clear();
          break;
        default:
          break;
      }
    }
  }
});

document.addEventListener("keypress", (event) => {
  let key = event.key;
  if (!isNaN(key) && key != " ") {
    if (mode == "equals") {
      displayNumber == 0
        ? updateDisplay(event.key)
        : updateDisplay(`${displayNumber}${event.key}`);
      console.log(`Display number is ${displayNumber}`);
    } else {
      operationNumber == 0
        ? updateDisplay(event.key)
        : updateDisplay(`${operationNumber}${event.key}`);
      console.log(`Operation number is ${operationNumber}`);
    }
  } else {
    switch (key) {
      case "+":
        console.log("plus");
        add();
        break;
      case "-":
        console.log("minus");
        subtract();
        break;
      case "x":
        console.log("times");
        multiply();
        break;
      case "*":
        console.log("times");
        multiply();
        break;
      case "/":
        console.log("divide");
        divide();
        break;
      case "=":
        console.log("equals");
        equals();
        break;
      case "Enter":
        console.log("equals");
        equals();
        break;
      default:
        break;
    }
  }
});

// Modal operations
function add() {
  mode = "addition";
  showOperation();
}

function subtract() {
  mode = "subtraction";
  showOperation();
}

function equals() {
  if (mode != "equals") {
    displayNumber = solve();
    operationNumber = 0;
  }
  mode = "equals";
  if (isFinite(displayNumber)) {
    updateDisplay(`${displayNumber}`);
  } else {
    clear();
    updateTinyText("Can't divide by zero", display);
  }
}

function divide() {
  mode = "division";
  showOperation();
}

function multiply() {
  mode = "multiplication";
  showOperation();
}

function solve() {
  switch (mode) {
    case "addition":
      return displayNumber + operationNumber;
    case "subtraction":
      return displayNumber - operationNumber;
    case "multiplication":
      return displayNumber * operationNumber;
    case "division":
      return displayNumber / operationNumber;
    default:
      break;
  }
}
