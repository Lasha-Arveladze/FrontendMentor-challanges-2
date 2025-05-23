"use strict";

// Sellecting all the elements
const form = document.querySelector(".form--box");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const formInput = document.querySelectorAll(".form--input");
const formLabel = document.querySelectorAll(".form--label");
const calcYears = document.querySelector(".calculated--numbers-years");
const calcMonths = document.querySelector(".calculated--numbers-months");
const calcDays = document.querySelector(".calculated--numbers-days");
const errorMessage = document.querySelectorAll(".error-message");

// Get Current date
const current = new Date();
const year = current.getFullYear();
const month = current.getMonth() + 1;
const days = current.getDate();

// Starting Position
const init = function () {
  formInput.forEach((input) =>
    input.classList.remove("error-message-border-color")
  );
  formLabel.forEach((label) => label.classList.remove("error-message--color"));

  errorMessage.forEach((err) => err.classList.add("hidden"));
};
// Error Handlign function
const showErrors = function (input, message) {
  input.forEach((err) => {
    err.textContent = `${message}`;
    err.classList.remove("hidden");
  });

  formInput.forEach((input) =>
    input.classList.add("error-message-border-color")
  );
  formLabel.forEach((label) => label.classList.add("error-message--color"));
};

// Check if the values are empty
const isEmpty = function (...inputs) {
  return inputs.some((input, i) => input.value.trim() === "");
};

// Check for valid date

function isValidDate(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  return (
    date.getFullYear() === parseInt(year, 10) &&
    date.getFullYear() <= new Date().getFullYear() &&
    date.getMonth() + 1 === parseInt(month, 10) &&
    date.getDate() === parseInt(day, 10)
  );
}

const displayAge = function () {
  const birthDate = new Date(
    +yearInput.value,
    +monthInput.value - 1,
    +dayInput.value
  );

  let ageYears = year - birthDate.getFullYear();
  let ageMonths = month - (birthDate.getMonth() + 1);
  let ageDays = days - birthDate.getDate();

  // Adjust if the birthday hasn't occurred yet this year
  if (ageDays < 0) {
    ageMonths -= 1;
    const previousMonth = new Date(year, month - 1, 0).getDate();
    ageDays += previousMonth;
  }

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  // Pad values and display
  calcYears.textContent = `${ageYears}`.padStart(2, "0");
  calcMonths.textContent = `${ageMonths}`.padStart(2, "0");
  calcDays.textContent = `${ageDays}`.padStart(2, "0");
};

// From submit validation
form.addEventListener("submit", function (e) {
  // To prevend page reload
  e.preventDefault();

  // Initalize
  init();

  // Form Validation

  // If fields are empty
  if (isEmpty(dayInput)) {
    showErrors([errorMessage[0]], "This field is required");
  }

  if (isEmpty(monthInput)) {
    showErrors([errorMessage[1]], "This field is required");
  }

  if (isEmpty(yearInput)) {
    showErrors([errorMessage[2]], "This field is required");
  }

  if ((+dayInput.value < 1 || +dayInput.value > 31) && !isEmpty(dayInput)) {
    // Date/month/year number validation
    // Here I give showErrors function input in array to use forEach function on it
    showErrors([errorMessage[0]], "Must be a valid day");
  }

  if (
    (+monthInput.value < 1 || +monthInput.value > 12) &&
    !isEmpty(monthInput)
  ) {
    // Here I give showErrors function input in array to use forEach function on it
    showErrors([errorMessage[1]], "Must be a valid month");
  }

  if (+yearInput.value > year && !isEmpty(yearInput)) {
    // Here I give showErrors function input in array to use forEach function on it
    showErrors([errorMessage[2]], "Must be in the past");
  }

  // Check if the date is actually exsists
  if (
    !isValidDate(+dayInput.value, +monthInput.value, +yearInput.value) &&
    !(+dayInput.value < 1 || +dayInput.value > 31) &&
    !(+monthInput.value < 1 || +monthInput.value > 12) &&
    !(+yearInput.value > year) &&
    !isEmpty(dayInput, yearInput, monthInput)
  ) {
    showErrors([errorMessage[0]], "Must be a valid date");
  }

  if (+yearInput.value < 1900 && yearInput.value !== "") {
    showErrors([errorMessage[2]], "Year must be 1900 or later");
  }

  if (
    isValidDate(+dayInput.value, +monthInput.value, +yearInput.value) &&
    +yearInput.value >= 1900
  ) {
    displayAge();
  }
});
