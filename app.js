const billInput = document.querySelector("#bill");
const allTipButtons = document.querySelectorAll(".form__btn--tip");
const peopleInput = document.querySelector("#people");
const totalTipPerson = document.querySelector(".result__tip--person");
const totalTipAmount = document.querySelector(".result__tip--total");
const resetBtn = document.querySelector(".result__btn--reset");
const form = document.querySelector(".form");
const InvalidBillError = document.querySelector(".form__error--bill");
const InvalidPersonError = document.querySelector(".form__error--person");
const customInput = document.querySelector(".form__btn--tip-custom");
const personContainer = document.querySelector(".form__people-wrapper");
const billContainer = document.querySelector(".form__bill-wrapper");

let target = "";
let isValid = true;
let selectedTip = 0;
let isCustomTip = false;

// total tip calculator func
function calculateTipFunc(billInput, tipPercent) {
  return billInput * (tipPercent / 100);
}

// total tip per person calculator func
function totalTipPerPerson(totalTip, person) {
  return totalTip / person;
}

// total bill per person calculator func
function totalBillPerPerson(bill, tip, person) {
  return (bill + tip) / person;
}

// reset to default state
function defaultState() {
  totalTipPerson.innerText = "$0.00";
  totalTipAmount.innerText = "$0.00";
  InvalidBillError.classList.add("hidden");
  InvalidPersonError.classList.add("hidden");
  personContainer.classList.remove("outline__error");
  billContainer.classList.remove("outline__error");
}

// show results func
function showTotalTip() {
  const billInputValue = Number(billInput.value); // convert to numbers for calc
  const peopleInputValue = Number(peopleInput.value); // convert to numbers for calc

  if (!isValid || peopleInputValue === 0) return;

  const currentTip = isCustomTip ? Number(customInput.value) : selectedTip;
  const totalTip = calculateTipFunc(billInputValue, currentTip);
  const tipPerPerson = totalTipPerPerson(totalTip, peopleInputValue);
  const totalPerPerson = totalBillPerPerson(
    billInputValue,
    totalTip,
    peopleInputValue
  );

  totalTipAmount.innerText = `$${totalPerPerson.toFixed(2)}`;
  totalTipPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
}

// all tip buttons loop and evt listener on each tip button
allTipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", (evt) => {
    target = evt.target;
    selectedTip = Number(target.value);
    isCustomTip = false;

    // select one tip button at a time so reset and set class
    allTipButtons.forEach((btn) => btn.classList.remove("active__btn"));
    target.classList.add("active__btn");

    showTotalTip();
  });
});

customInput.addEventListener("input", () => {
  // prevent users to type invalid characters and symnbols
  customInput.value = customInput.value
    .replace(/[^0-9.]/g, "") // only digits and one dot
    .replace(/(\..*)\./g, "$1"); // block multiple dots
  isCustomTip = true;
  selectedTip = 0;
  if (customInput.value > 100) {
    customInput.style.color = "#ff726b";
    customInput.value = 0;
  } else {
    customInput.style.color = "#00494d";
  }

  allTipButtons.forEach((btn) => btn.classList.remove("active__btn"));
  showTotalTip();
});

billInput.addEventListener("input", () => {
  billInput.value = billInput.value
    .replace(/[^0-9.]/g, "") // only digits and one dot
    .replace(/(\..*)\./g, "$1"); // block multiple dots

  if (billInput.value === "") {
    billContainer.classList.add("outline__error");
    InvalidBillError.classList.remove("hidden");
    isValid = false;
  } else {
    billContainer.classList.remove("outline__error");
    InvalidBillError.classList.add("hidden");
    isValid = true;
  }

  showTotalTip();
});

// people/person input evt listener
peopleInput.addEventListener("input", () => {
  peopleInput.value = peopleInput.value.replace(/[^0-9]/g, "");

  if (peopleInput.value === "" || Number(peopleInput.value) === 0) {
    defaultState();
    InvalidPersonError.classList.remove("hidden");
    personContainer.classList.add("outline__error");
    isValid = false;
  } else {
    InvalidPersonError.classList.add("hidden");
    personContainer.classList.remove("outline__error");
    isValid = true;
    showTotalTip();
  }
});

resetBtn.addEventListener("click", () => {
  form.reset();
  defaultState();
  isCustomTip = false;
  selectedTip = 0;
  if (target) target.classList.remove("active__btn");
});
