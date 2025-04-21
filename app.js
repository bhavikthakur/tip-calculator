const billInput = document.querySelector("#bill");
const allTipButtons = document.querySelectorAll(".form__btn--tip");
const peopleInput = document.querySelector("#people");
const totalTipPerson = document.querySelector(".result__tip--person");
const totalTipAmount = document.querySelector(".result__tip--total");
const resetBtn = document.querySelector(".result__btn--reset");
const form = document.querySelector(".form");

allTipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", (evt) => {
    const targetedTip = Number(evt.target.value); // exact tip button
    const billInputValue = Number(billInput.value); // total bill

    // calculate total tip
    function calculateTipFunc(billInput, targetedTip) {
      const totalTipCalc = billInput * (targetedTip / 100);
      return totalTipCalc;
    }

    const totalTip = calculateTipFunc(billInputValue, targetedTip); // total tip in variable

    // calculate total tip
    function showTotalTip() {
      totalTipAmount.innerText = `$${totalTip.toFixed(2)}`;
    }
    showTotalTip();

    peopleInput.addEventListener("input", () => {
      const peopleInputValue = Number(peopleInput.value); // total person
      // calculate per person tip
      function totalTipPerPerson(person) {
        return totalTip / person;
      }
      const TipPerPerson = totalTipPerPerson(peopleInputValue);
      totalTipPerson.innerText = `$${TipPerPerson.toFixed(2)}`;
    });
  });
});

resetBtn.addEventListener("click", () => {
  form.reset();
  totalTipPerson.innerText = "$0.00";
  totalTipAmount.innerText = "$0.00";
});
