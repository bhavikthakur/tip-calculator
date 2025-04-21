const billInput = document.querySelector("#bill");
const allTipButtons = document.querySelectorAll(".form__btn--tip");
const peopleInput = document.querySelector("#people");
const totalTipPerson = document.querySelector(".result__tip--person");
const totalTipAmount = document.querySelector(".result__tip--total");
const resetBtn = document.querySelector(".result__btn--reset");
const form = document.querySelector(".form");
const errorMessage = document.querySelector(".form__error");
const customInput = document.querySelector(".form__btn--tip-custom");
const personContainer = document.querySelector(".form__people-wrapper");

allTipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", (evt) => {
    const targetedTip = Number(evt.target.value); // exact tip button
    const billInputValue = Number(billInput.value); // total bill
    const customInputValue = Number(customInput.value);

    // calculate total tip
    function calculateTipFunc(billInput, targetedTip) {
      const totalTipCalc = billInput * (targetedTip / 100);
      return totalTipCalc;
    }

    const totalTip = calculateTipFunc(billInputValue, targetedTip); // total tip in variable

    peopleInput.addEventListener("input", () => {
      const peopleInputValue = Number(peopleInput.value); // total person

      // calculate per person tip
      function totalTipPerPerson(person) {
        return totalTip / person;
      }
      // calculate total tip
      function showTotalTip() {
        totalTipAmount.innerText = `$${totalTip.toFixed(2)}`;
        totalTipPerson.innerText = `$${TipPerPerson.toFixed(2)}`;
      }
      const TipPerPerson = totalTipPerPerson(peopleInputValue);

      if (peopleInputValue === 0) {
        defaultText();
        errorMessage.classList.remove("hidden");
        personContainer.classList.add("outline__error");
      } else {
        showTotalTip();
        errorMessage.classList.add("hidden");
        personContainer.classList.remove("outline__error");
      }
    });
  });
});
function defaultText() {
  totalTipPerson.innerText = "$0.00";
  totalTipAmount.innerText = "$0.00";
}

resetBtn.addEventListener("click", () => {
  form.reset();
  defaultText();
});
