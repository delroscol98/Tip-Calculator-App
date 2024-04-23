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

//1. Get the value of the bill input and save into a BILL variable
//2. Get the value of the percentage input and save into a PERCENTAGE variable
//3. Get the value of the people input and save into a PEOPLE variable
//4. Calculate the tip-per-person and the total-per-person
//5. Render tip-per-person and total-per-person to the UI using the calculate button
//6. Reset all the inputs and tip data to original state using the reset button
