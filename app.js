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

let target = ""; // global variable for targeted tip, useful for reset evt outside scope
let isValid = true; // all conditions check

allTipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", (evt) => {
    target = evt.target; // current active tip
    let targetedTip = Number(evt.target.value); // selected tip in number
    const billInputValue = Number(billInput.value); // total bill in number

    // reset buttons with no outline
    allTipButtons.forEach((tipButton) => {
      tipButton.classList.remove("active__btn");
    });

    // add outline to only one btn at a time
    target.classList.add("active__btn");

    // custom input variables
    let customInputValue = 0;
    let totalCustomTip = 0;
    let totalCustomTipPerson = 0;

    /// custom input evt
    customInput.addEventListener("input", () => {
      customInput.value = customInput.value.replace(/[eE+-]/g, "");
      customInputValue = Number(customInput.value);
      totalCustomTip = calculateTipFunc(billInputValue, customInputValue);
    });

    // calculate total tip func
    function calculateTipFunc(billInput, targetedTip) {
      const totalTipCalc = billInput * (targetedTip / 100);
      return totalTipCalc;
    }

    // total standard tip stored in variable
    const totalTip = calculateTipFunc(billInputValue, targetedTip);

    // person input evt
    peopleInput.addEventListener("input", () => {
      peopleInput.value = peopleInput.value.replace(/[^0-9]/g, ""); // Digits only
      const peopleInputValue = Number(peopleInput.value); // total person in number

      // calculate per person tip func
      function totalTipPerPerson(totalTip, person) {
        return totalTip / person;
      }

      // total custom tip per person
      totalCustomTipPerson = totalTipPerPerson(
        totalCustomTip,
        peopleInputValue
      );

      // total standard tip per person
      const tipPerPerson = totalTipPerPerson(totalTip, peopleInputValue);

      // show total tip and per person result func
      function showTotalTip() {
        if (isValid && customInput.value !== "") {
          totalTipAmount.innerText = `$${totalCustomTip.toFixed(2)}`;
          totalTipPerson.innerText = `$${totalCustomTipPerson.toFixed(2)}`;
        } else if (isValid) {
          totalTipAmount.innerText = `$${totalTip.toFixed(2)}`;
          totalTipPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
        }
      }

      // error states & conditions
      if (peopleInputValue === 0) {
        defaultState();
        InvalidPersonError.classList.remove("hidden");
        personContainer.classList.add("outline__error");
      } else {
        showTotalTip();
        InvalidPersonError.classList.add("hidden");
        personContainer.classList.remove("outline__error");
      }
    });
  });
});

// reset to default state func
function defaultState() {
  totalTipPerson.innerText = "$0.00";
  totalTipAmount.innerText = "$0.00";
  InvalidBillError.classList.add("hidden");
  InvalidPersonError.classList.add("hidden");
  personContainer.classList.remove("outline__error");
  billContainer.classList.remove("outline__error");
}

// reset button event
resetBtn.addEventListener("click", () => {
  form.reset();
  defaultState();
  if (target) target.classList.remove("active__btn");
});

// Blocking users from certain keys to avoid characters and symbols
billInput.addEventListener("input", () => {
  billInput.value = billInput.value.replace(/[eE+-]/g, "");

  if (billInput.value === "") {
    billContainer.classList.add("outline__error");
    InvalidBillError.classList.remove("hidden");
    isValid = false;
  } else {
    billContainer.classList.remove("outline__error");
    InvalidBillError.classList.add("hidden");
    isValid = true;
  }
});

peopleInput.addEventListener("input", () => {
  peopleInput.value = peopleInput.value.replace(/[eE+\-]/g, "");

  if (peopleInput.value === "") {
    personContainer.classList.add("outline__error");
    InvalidPersonError.classList.remove("hidden");
    isValid = false;
  } else {
    personContainer.classList.remove("outline__error");
    InvalidPersonError.classList.add("hidden");
    isValid = true;
  }
});
