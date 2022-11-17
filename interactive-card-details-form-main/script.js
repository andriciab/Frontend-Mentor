"use strict";

const nameInput = document.getElementById("form-name");
const changeNameInput = document.getElementById("name");

const numberInput = document.getElementById("form-number");
const changeNumberInput = document.getElementById("number");

const monthInput = document.getElementById("form-month");
const changeMonthInput = document.getElementById("month");

const yearInput = document.getElementById("form-year");
const changeYearInput = document.getElementById("year");

const cvcInput = document.getElementById("form-cvc");
const changeCvcInput = document.getElementById("cvc");

// ============================================== //
// CHANGE TEXT ON CARDS AS THE USER IS TYPING //

nameInput.addEventListener("input", function () {
  changeNameInput.innerHTML = nameInput.value;

  if (nameInput.value === "" || nameInput.value === null) {
    changeNameInput.innerHTML = "Jane Appleseed";
  }
});

numberInput.addEventListener("input", function () {
  changeNumberInput.innerHTML =
    numberInput.value.slice(0, 4) +
    " " +
    numberInput.value.slice(4, 8) +
    " " +
    numberInput.value.slice(8, 12) +
    " " +
    numberInput.value.slice(12, 16);

  if (numberInput.value === "" || numberInput.value === null) {
    changeNumberInput.innerHTML = "0000 0000 0000 0000";
  }
});

monthInput.addEventListener("input", function () {
  changeMonthInput.innerHTML = `${monthInput.value}/`;

  if (monthInput.value === "" || monthInput.value === null) {
    changeMonthInput.innerHTML = "00/";
  }
});

yearInput.addEventListener("input", function () {
  changeYearInput.innerHTML = yearInput.value;

  if (yearInput.value === "" || yearInput.value === null) {
    changeYearInput.innerHTML = "00";
  }
});

cvcInput.addEventListener("input", function () {
  changeCvcInput.innerHTML = cvcInput.value;

  if (cvcInput.value === "" || cvcInput.value === null) {
    changeCvcInput.innerHTML = "000";
  }
});

// ============================================== //
// VALIDATE USER INPUT //

function validateName() {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(nameInput.value);
}

function validateNumber() {
  const numberRegex = /^[0-9]{16}$/;
  return numberRegex.test(numberInput.value);
}

function validateMonth() {
  const monthRegex = /^(0[1-9]|1[012])$/;
  return monthRegex.test(monthInput.value);
}

function validateYear() {
  const yearRegex = /^[0-9]{2}$/;
  return yearRegex.test(yearInput.value);
}

function validateCvc() {
  const cvcRegex = /^[0-9]{3}$/;
  return cvcRegex.test(cvcInput.value);
}

// ============================================== //
// IF USER INPUT OK, SUBMIT FORM //
// ELSE DISPLAY ERRORS //

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  let sendForm = 1;
  if (!validateName()) {
    document.getElementById("form-name").style.borderColor = "red";
    document.getElementById("name-error").classList.add("show-error");
    sendForm = 0;
  } else {
    document.getElementById("form-name").style.borderColor =
      "hsl(270, 3%, 87%)";
    document.getElementById("name-error").classList.remove("show-error");
  }

  if (!validateNumber()) {
    document.getElementById("form-number").style.borderColor = "red";
    document.getElementById("number-error").classList.add("show-error");
    sendForm = 0;
  } else {
    document.getElementById("form-number").style.borderColor =
      "hsl(270, 3%, 87%)";
    document.getElementById("number-error").classList.remove("show-error");
  }

  if (!validateMonth()) {
    document.getElementById("form-month").style.borderColor = "red";
    document.getElementById("month-error").classList.add("show-error");
    sendForm = 0;
  } else {
    document.getElementById("form-month").style.borderColor =
      "hsl(270, 3%, 87%)";
    document.getElementById("month-error").classList.remove("show-error");
  }

  if (!validateYear()) {
    document.getElementById("form-year").style.borderColor = "red";
    document.getElementById("year-error").classList.add("show-error");
    sendForm = 0;
  } else {
    document.getElementById("form-year").style.borderColor =
      "hsl(270, 3%, 87%)";
    document.getElementById("year-error").classList.remove("show-error");
  }

  if (!validateCvc()) {
    document.getElementById("form-cvc").style.borderColor = "red";
    document.getElementById("cvc-error").classList.add("show-error");
    sendForm = 0;
  } else {
    document.getElementById("form-cvc").style.borderColor = "hsl(270, 3%, 87%)";
    document.getElementById("cvc-error").classList.remove("show-error");
  }

  if (sendForm === 0) {
    e.preventDefault();
  } else {
    e.preventDefault();
    document.getElementById("form").classList.add("hidden");
    document.getElementById("thanksie").classList.remove("hidden");
    resetForm();
  }
});

// ============================================== //

function resetForm() {
  const continueBtn = document.getElementById("continue");
  continueBtn.addEventListener("click", function () {
    document.getElementById("form").classList.remove("hidden");
    document.getElementById("thanksie").classList.add("hidden");
    window.location.reload();
    nameInput.value = "";
    numberInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    cvcInput.value = "";
  });
}
