const billInputField = document.querySelector(".input-field-bill");
const peopleInputField = document.querySelector(".input-field-people");
const resultTextTip = document.querySelector(".result-text-tip");
const resultTextTotal = document.querySelector(".result-text-total");
const resetButton = document.querySelector(".reset-button");
const tipSelectParent = document.querySelector(".tip-select--grid");
const customTipPercentage = document.querySelector("#tip-percentage-custom");
const tipButtons = document.querySelectorAll(".tip-button");

// Variables to track selected values
let selectedTipPercentage = null;
let customPercentage = 0;
let billAmount = 0;
let numberOfPeople = 0;

const clearBtnActive = function () {
  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// Save the user's choosen tip percentage
tipSelectParent.addEventListener("click", function (e) {
  selectedTipPercentage = e.target.dataset.percentage;
  // Guar close if user clicked somewhere else witch doesn't have dataset
  if (!selectedTipPercentage) return;

  customTipPercentage.value = "";
  displayResults();

  // Here I implemented tip selection logic (visually)
  if (e.target.classList.contains("tip-button")) {
    clearBtnActive();
    e.target.classList.add("active");
  }
});

// Check each fields validity
const customPercentageValidity = function () {
  clearBtnActive();
  customPercentage = parseInt(customTipPercentage.value);
  if (
    customPercentage <= 0 ||
    (customPercentage === NaN && !selectedTipPercentage)
  ) {
    customTipPercentage.style.border = "2px solid var(--color-orange)";
    return false;
  }
  customTipPercentage.style.border = "2px solid var(--color-grey-50)";
  return customPercentage || selectedTipPercentage;
};

const billInputValidity = function () {
  billAmount = parseInt(billInputField.value);
  if (billAmount <= 0 || isNaN(billAmount)) {
    document.querySelector(".error-message-bill").textContent =
      "should be positive!";
    document.querySelector(".input-field-bill").style.border =
      "2px solid var(--color-orange)";
    return false;
  }

  document.querySelector(".error-message-bill").textContent = "";
  billInputField.style.border = "2px solid var(--color-grey-50)";
  return billAmount;
};

const peopleInputValidity = function () {
  numberOfPeople = parseInt(peopleInputField.value);
  if (numberOfPeople <= 0) {
    document.querySelector(".error-message-people").textContent =
      "should be positive!";
    document.querySelector(".input-field-people").style.border =
      "2px solid var(--color-orange)";
    return false;
  }
  document.querySelector(".error-message-people").textContent = "";
  peopleInputField.style.border = "2px solid var(--color-grey-50)";
  return numberOfPeople;
};

const displayResults = function () {
  if (
    customPercentageValidity() &&
    billInputValidity() &&
    peopleInputValidity()
  ) {
    const resultTip = (
      (billInputValidity() * customPercentageValidity()) /
      100 /
      peopleInputValidity()
    ).toFixed(2);
    resultTextTip.textContent = `$${resultTip}`;

    const resultTotal = (
      (billInputValidity() +
        (billInputValidity() * customPercentageValidity()) / 100) /
      peopleInputValidity()
    ).toFixed(2);
    resultTextTotal.textContent = `$${resultTotal}`;
  }
};

// First state of the program
const init = function () {
  billInputField.value = "";
  peopleInputField.value = "";
  resultTextTip.textContent = "$0.00";
  resultTextTotal.textContent = "$0.00";
  customTipPercentage.value = "";
  clearBtnActive();
};

// Reset functionality
resetButton.addEventListener("click", init);

// CONTINUOUS CHECKING - Add event listeners to input fields
billInputField.addEventListener("input", function () {
  billInputValidity();
  displayResults();
});
billInputField.addEventListener("change", function () {
  billInputValidity();
  displayResults();
});

peopleInputField.addEventListener("input", function () {
  peopleInputValidity();
  displayResults();
});
peopleInputField.addEventListener("change", function () {
  peopleInputValidity();
  displayResults();
});

customTipPercentage.addEventListener("input", function () {
  customPercentageValidity();
  displayResults();
});

customTipPercentage.addEventListener("change", function () {
  customPercentageValidity();
  displayResults();
});
