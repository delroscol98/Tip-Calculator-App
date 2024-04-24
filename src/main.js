function restrictTwoDecimal(tis) {
  let prev = tis.getAttribute("data-prev");
  prev = prev != "" ? prev : "";
  if (!tis.value.match(/^\d*(\.\d{0,2})?$/)) tis.value = prev;
  tis.setAttribute("data-prev", tis.value);
}

function restrictInteger(tis) {
  let prev = tis.getAttribute("data-prev");
  prev = prev != "" ? prev : "";
  if (!tis.value.match(/^[0-9]*$/)) tis.value = prev;
  tis.setAttribute("data-prev", tis.value);
}

//4. Calculate the tip-per-person and the total-per-person
//5. Render tip-per-person and total-per-person to the UI using the calculate button
//6. Reset all the inputs and tip data to original state using the reset button

let tipPercentage = 0;

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
    })
  );
};

//2a. Get the value of the percentage input and save into a PERCENTAGE variable
const getPercentageHandler = () => {
  const activePercentage = document.querySelector(
    ".tip-percentage-container .percentage-value.active"
  );
  const tipPercentage = activePercentage.value;
  return tipPercentage;
};

const calculate = (bill, tipPercentage, numPeople) => {
  let tipAmountPP = 0;
  let totalAmountPP = 0;

  let billPP = (bill / numPeople).toFixed(2);
  console.log(`The bill per person is: $${billPP}`);

  tipAmountPP = (billPP * (tipPercentage / 100)).toFixed(2);
  console.log(`The tip per person is: $${tipAmountPP}`);

  totalAmountPP = (+billPP + +tipAmountPP).toFixed(2);
  console.log(`The total per person is: $${totalAmountPP}`);

  return [tipAmountPP, totalAmountPP];
};

const calculateBtnHandler = () => {
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

const init = () => {
  percentageBtnHandler();
  calculateBtnHandler();
};

init();
