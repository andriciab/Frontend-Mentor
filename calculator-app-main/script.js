"use strict";

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.reset();
  }

  reset() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "x":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return;
    }
    if (result.toString().length > 15) {
      this.displayError();
    } else {
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = "";
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
    if (this.currentOperand.length > 15) {
      this.displayError();
    }
  }

  displayError() {
    alert("Error: Too Large!");
    this.reset();
    this.currentOperandText.innerText = "";
    this.previousOperandText.innerText = "";
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const deleteButton = document.querySelector(".delete");
const resetButton = document.querySelector(".reset");
const equalButton = document.querySelector(".equal");
const previousOperandText = document.querySelector(".previous-operand");
const currentOperandText = document.querySelector(".current-operand");
const errorMessage = document.querySelector(".error-msg");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((key) => {
  key.addEventListener("click", () => {
    calculator.appendNumber(key.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((key) => {
  key.addEventListener("click", () => {
    calculator.chooseOperation(key.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (key) => {
  calculator.compute();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", (key) => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (key) => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "t") {
    console.log(calculator.operation);
  }
});

// ==== THEME TOGGLER ====

const toggle = document.querySelector(".theme-toggler");
const ball = document.querySelector(".indicator");
const title = document.querySelector(".title");
const screen = document.querySelector(".screen");
const btnsGrid = document.querySelector(".btns-grid");
const blueBtn = document.querySelectorAll(".blue-btn");
const redBtn = document.querySelector(".red-btn");
const previousOperandtog = document.querySelector(".previous-operand");
const currentOperandtog = document.querySelector(".current-operand");
toggle.addEventListener("click", function () {
  document.body.classList.toggle("active");
  toggle.classList.toggle("active");
  ball.classList.toggle("active");
  title.classList.toggle("active");
  screen.classList.toggle("active");
  btnsGrid.classList.toggle("active");
  blueBtn.forEach((e) => e.classList.toggle("active"));
  redBtn.classList.toggle("active");
  previousOperandtog.classList.toggle("prev-op-text");
  currentOperandtog.classList.toggle("curr-op-text");
});
