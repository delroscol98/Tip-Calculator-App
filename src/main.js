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

const activePercentageBtnHandler = (targetEl, activeEl) => {
  targetEl !== activeEl
    ? (targetEl.classList.add("active"), activeEl.classList.remove("active"))
    : null;
};

const percentageBtnHandler = (e) => {
  const percentageInputs = document.querySelectorAll(
    ".tip-percentage-container"
  )[0].children;

  for (let i = 0; i < percentageInputs.length; i++) {
    let input = percentageInputs[i];
    input.addEventListener("click", (e) => {
      const activeEl = document.querySelector(
        ".tip-percentage-container .active"
      );
      const targetEl = e.target;
      activePercentageBtnHandler(targetEl, activeEl);
    });
  }
};

const calculate = (bill, billPercentage, numPeople) => {
  let tipAmountPP = 0;
  let totalAmountPP = 0;

  let billPP = Number((bill / numPeople).toFixed(2));
  tipAmountPP = (billPP / (billPercentage / 100)).toFixed(2);
  totalAmountPP = billPP + tipAmountPP;

  console.log(tipAmountPP, totalAmountPP);
  return [tipAmountPP, totalAmountPP];
};

const calculateBtnHandler = () => {
  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.addEventListener("click", () => {
    const tipPerPerson = document.getElementById("tip-pp");
    const totalPerPerson = document.getElementById("total-pp");

    const billValue = Number(document.getElementById("bill").value);
    let percentageValue = 0;
    const numberOfPeople = Number(document.getElementById("people").value);

    if (document.querySelector("button.active")) {
      percentageValue = Number(
        document.querySelector("button.active span").innerText
      );
    } else {
      percentageValue = Number(document.querySelector("input.active").value);
    }

    const [tipAmountPP, totalAmountPP] = calculate(
      billValue,
      percentageValue,
      numberOfPeople
    );

    tipPerPerson.innerText = `$${tipAmountPP}`;
    totalPerPerson.innerText = `$${totalAmountPP}`;
  });
};

const init = () => {
  percentageBtnHandler();
  calculateBtnHandler();
};

init();
