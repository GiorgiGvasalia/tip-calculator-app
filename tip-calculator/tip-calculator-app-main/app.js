const billInput = document.getElementById("bill-input");
const numOfPeople = document.getElementById("number-of-people");
const tipPerPersonDisplay = document.querySelector(".tip-per-person-display");
const totalAmountDisplay = document.querySelector(".total-amount-per-person");
const forBillError = document.querySelector(".for-bill-error");
const forPeopleError = document.querySelector(".for-people-error");
const customInput = document.querySelector(".custom");

const resetBtn = document.getElementById("reset-btn");

const buttons = document.querySelector(".tip-selection-container");

buttons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;

  let percentage = btn.dataset.percentage;

  calculations(percentage);
});

customInput.addEventListener("input", () => {
  removeError(customInput);
  calculateCustom();
});

resetBtn.addEventListener("click", () => {
  resetResults();
});

// ERROR HANDLING
function displayError(element) {
  const existingErrorLabel = element.querySelector(".error-label");
  if (existingErrorLabel) {
    element.removeChild(existingErrorLabel);
  }

  const errorLabel = document.createElement("label");
  errorLabel.textContent = "Can't be a zero";
  errorLabel.classList.add("error-label");

  if (element === forBillError) {
    const newLabelForBill = forBillError.appendChild(errorLabel);
    element.appendChild(newLabelForBill);
    billInput.classList.add("error");
  } else if (element === forPeopleError) {
    const newLabelForPeople = forPeopleError.appendChild(errorLabel);
    element.appendChild(newLabelForPeople);
    numOfPeople.classList.add("error");
  }
}

function removeError(element) {
  const existingErrorLabel = element.querySelector(".error-label");
  if (existingErrorLabel) {
    element.removeChild(existingErrorLabel);
    element.parentNode.classList.remove("error");
  }
}

function calculateCustom() {
  const customPercentage = parseFloat(customInput.value);

  if (customPercentage <= 0 || isNaN(customPercentage)) {
    customInput.classList.add("error");
    return;
  }

  calculations(customPercentage);
}



function calculations(percentage) {
  if (billInput.value <= 0 || isNaN(billInput.value)) {
    displayError(forBillError);
    return;
  }

  if (numOfPeople.value <= 0 || isNaN(numOfPeople.value)) {
    displayError(forPeopleError);
    return;
  }

  const tipAmount = (billInput.value / 100) * parseFloat(percentage);
  const tipPerPerson = tipAmount / numOfPeople.value;
  const totalAmountPerPerson =
    billInput.value / numOfPeople.value + tipPerPerson;

  tipPerPersonDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmountPerPerson.toFixed(2)}`;

  removeError(forBillError);
  billInput.classList.remove("error");
  removeError(forPeopleError);
  numOfPeople.classList.remove("error");
  removeError(customInput);
  customInput.classList.remove("error");
}

const resetResults = () => {
  tipPerPersonDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  billInput.value = "";
  numOfPeople.value = "";
  customInput.value = "";
  removeError(forBillError);
  billInput.classList.remove("error");
  removeError(forPeopleError);
  numOfPeople.classList.remove("error");
  removeError(customInput);
  customInput.classList.remove("error");
};
