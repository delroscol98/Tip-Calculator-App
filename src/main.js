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

const billValue = document.getElementById("bill").value;
const numberOfPeople = document.getElementById("people").value;

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

      //2a. Get the value of the percentage input and save into a PERCENTAGE variable
      if (targetEl.localName === "button") {
        console.log(targetEl.innerText);
      } else if (targetEl.localName === "input") {
        console.log(targetEl.value);
      }
    })
  );
};

const init = () => {
  percentageBtnHandler();
};

init();

const el = document.querySelector("button");
console.log(el.localName);
