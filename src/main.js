/**
 * Restricts the bill input to two decimal places
 * @param {Element} tis - Bill Input
 */
function restrict(tis, regex) {
  // data-prev attribute is retrieved from the input and placed in a variable called prev
  let prev = tis.getAttribute("data-prev");

  // If the value of data-prev is non empty leave it, otherwise set it to an empty string
  prev = prev != "" ? prev : "";

  // If the value of the input matches the passed in Regular Expression then the value of the input is set to data-prev
  if (!tis.value.match(regex)) tis.value = prev;

  // Sets the value of the data-prev attribute to the value of the string
  tis.setAttribute("data-prev", tis.value);
}

/**
 * Takes care of validation styling. If the input is non empty, the active class is added. If the input is empty, the inactive class is added, with an error message displayed.
 */
const validation = () => {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const errorMsg = document.getElementById("error-msg");

  billInput.addEventListener("change", () => {
    if (billInput.value.length < 1) {
      billInput.classList.add("inactive");
      billInput.classList.remove("active");
    } else {
      billInput.classList.remove("inactive");
      billInput.classList.add("active");
    }
  });

  peopleInput.addEventListener("change", () => {
    if (peopleInput.value.length < 1) {
      peopleInput.classList.add("inactive");
      peopleInput.classList.remove("active");
      errorMsg.classList.remove("hidden");
    } else {
      peopleInput.classList.remove("inactive");
      peopleInput.classList.add("active");
      errorMsg.classList.add("hidden");
    }
  });
};

/**
 * Changes the active element within the percentage container
 */
const percentageBtnHandler = () => {
  //2. Render active states based on clicked button or selected input
  const percentageBtnsAndInput = document.querySelectorAll(".percentage-value");
  percentageBtnsAndInput.forEach((el) =>
    el.addEventListener("click", (e) => {
      const activeEl = document.querySelector(
        ".tip-percentage-container .percentage-value.active"
      );
      const targetEl = e.target;
      targetEl.classList.add("active");
      activeEl.classList.remove("active");
      if (activeEl.localName === "input") {
        activeEl.value = "";
      }
    })
  );
};

/**
 * Returns the value of the custom percentage
 * @returns {Element} - The value of the custom percentage
 */
const getPercentageHandler = () => {
  //2a. Get the value of the percentage input and save into a PERCENTAGE variable
  const activePercentage = document.querySelector(
    ".tip-percentage-container .percentage-value.active"
  );
  const tipPercentage = activePercentage.value;
  return tipPercentage;
};

/**
 *  Caluclates the tip amount per person and the total amount per person based on the passed in bill amount, chosen tip percentage, and the indicated number of people.
 * @param {Number} bill
 * @param {Number} tipPercentage
 * @param {Number} numPeople
 * @returns {Array<Number>}
 */
const calculate = (bill, tipPercentage, numPeople) => {
  //4. Calculate the tip-per-person and the total-per-person
  let tipAmountPP = 0;
  let totalAmountPP = 0;

  //The passed in bill is distributed among the passed in number of people correct to two decimal places to factor in cents
  let billPP = (bill / numPeople).toFixed(2);
  console.log(`The bill per person is: $${billPP}`);

  //Tip amount is upated as the bill per person is multiplied by the chosen percentage which is converted to a decimal and rounded to two decimal places.
  tipAmountPP = (billPP * (tipPercentage / 100)).toFixed(2);
  console.log(`The tip per person is: $${tipAmountPP}`);

  //The previous two variables are added together to produce total.
  totalAmountPP = (+billPP + +tipAmountPP).toFixed(2);
  console.log(`The total per person is: $${totalAmountPP}`);

  return [tipAmountPP, totalAmountPP];
};

/**
 * The calculate function is triggered when the calculate button is triggered and renders the tip-per-person and total-per-person to the UI
 */
const calculateBtnHandler = () => {
  //5. Render tip-per-person and total-per-person to the UI using the calculate button
  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.addEventListener("click", () => {
    const tipAmountPPEl = document.getElementById("tip-pp");
    const totalAmountPPEl = document.getElementById("total-pp");
    const billValue = document.getElementById("bill").value;
    const numberOfPeople = document.getElementById("people").value;
    const tipPercentage = getPercentageHandler();

    const [tipAmountPP, totalAmountPP] = calculate(
      billValue,
      tipPercentage,
      numberOfPeople
    );

    tipAmountPPEl.innerText = `$${tipAmountPP}`;
    totalAmountPPEl.innerText = `$${totalAmountPP}`;
  });
};

/**
 * Resets all the inputs and tip data to original state using the reset button
 * @returns {null}
 */
const reset = () => {
  //6. Resets all the inputs and tip data to original state using the reset button
  const billInput = document.getElementById("bill");
  const numberOfPeopleInput = document.getElementById("people");
  const activePercentage = document.querySelector(
    ".tip-percentage-container .percentage-value.active"
  );
  const defaultActivePercentage = document.querySelector(
    ".tip-percentage-container"
  ).children[0];

  billInput.value = 0;
  numberOfPeopleInput.value = 0;
  if (activePercentage === defaultActivePercentage) {
    return;
  }
  activePercentage.classList.remove("active");
  defaultActivePercentage.classList.add("active");
};

const resetBtnHandler = () => {
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", reset);
};

/**
 * Initialises all above functions
 */
const init = () => {
  validation();
  percentageBtnHandler();
  calculateBtnHandler();
  resetBtnHandler();
};

init();
