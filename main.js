let dateNow = new Date(),
  dayNow = dateNow.getDate(),
  monthNow = dateNow.getMonth() + 1,
  yearNow = dateNow.getFullYear(),
  dayInput = document.getElementById("day"),
  monthInput = document.getElementById("month"),
  yearInput = document.getElementById("year"),
  button = document.getElementById("but"),
  errorHappen = false, // if true i will delete the span and the css style
  text = "",
  errorEmptyHappened = false,
  errorInvalidHappened = false;
const DAYS_MONTHS = {
  1: 31,
  2: [28, 29],
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
button.addEventListener("click", makeTheJobDone);
function errorEmpty() {
  if (dayInput.value == "" || monthInput.value == "" || yearInput.value == "") {
    errorEmptyHappened = true;
    text = "This filed is required";
    colorRed(dayInput);
    colorRed(monthInput);
    colorRed(yearInput);
  }
}
function errorInvalid() {
  let dayRex = /[1-31]/g;
  let yearTest = yearNow < yearInput.value ? false : true;
  if (!dayRex.test(dayInput.value)) {
    text = "Must be a valid day";
    colorRed(dayInput);
    errorInvalidHappened = true;
  }
  
  if (monthInput.value < 1 || monthInput.value> 12) {
    text = "Must be a valid month";
    colorRed(monthInput);
    errorInvalidHappened = true;
  }
  if (!yearTest) {
    text = "Must be in the past";
    colorRed(yearInput);
    errorInvalidHappened = true;
  }
  if (yearNow == yearInput.value) {
    if (monthNow < monthInput.value) {
      text = "Must be in the past";
      colorRed(monthInput);
      errorInvalidHappened = true;
    }
    if (dayNow < dayInput.value) {
      text = "Must be in the past";
      colorRed(dayInput);
      errorInvalidHappened = true;
    }
  }

  if (DAYS_MONTHS[monthInput.value] < dayInput.value && monthInput != "2") {
    text = `this month does not have that day`;
    colorRed(dayInput);
    errorInvalidHappened = true;
  }
  if (monthInput == "2") {
    if (
      (+yearInput % 4 == 0 && +yearInput % 100 != 0) ||
      +yearInput % 400 == 0
    ) {
      if (DAYS_MONTHS["2"][1] < dayInput) {
        text = `this month does not have that day`;
        colorRed(dayInput);
        errorInvalidHappened = true;
      }
    } else if (DAYS_MONTHS["2"][0] < dayInput) {
      text = `this month does not have that day`;
      colorRed(dayInput);
      errorInvalidHappened = true;
    }
  }
}
function colorRed(e) {
  if(e.value != "") return ;
  e.parentElement.childNodes[1].style.color = "#ff000096";
  e.parentElement.childNodes[3].style.border = "1px solid #ff000096";
  let spanText = document.createElement("span");
  spanText.append(text);
  spanText.style.cssText = `
    margin-top: 5px;
    font-family: poppins-italic;
    font-size: 12px;
    color: #ff000096;
  `;
  e.parentElement.append(spanText);
}
function deleteSpans() {
  let parentInputsBoxes = document.querySelectorAll(".inputs .box"),
    size = 3;
  for (let i = 0; i < size; i++) {
    if (parentInputsBoxes[i].childNodes.length === 6) {
      parentInputsBoxes[i].childNodes[1].style.color = "#575353";
      parentInputsBoxes[i].childNodes[3].style.border = "1px solid #868686";
      parentInputsBoxes[i].childNodes[5].remove();
    }
  }
  errorHappen = false;
}
function calcDate() {
  let numDay = document.getElementById("num-day"),
    numMonth = document.getElementById("num-month"),
    numYear = document.getElementById("num-year"),
    result = 0;
  if (dayInput.value > dayNow) {
    result = dayNow - dayInput.value + DAYS_MONTHS[monthNow];
    monthNow--;
  } else {
    result = dayNow - dayInput.value;
  }
  numDay.innerText = result;

  if (monthInput.value > monthNow) {
    result = monthNow - +monthInput.value + 12;
    yearNow--;
  } else {
    result = monthNow - +monthInput.value;
  }

  numMonth.innerText = result;
  result = yearNow - yearInput.value;
  numYear.innerText = result;
}
function resetDate() {
  let numDay = document.getElementById("num-day"),
    numMonth = document.getElementById("num-month"),
    numYear = document.getElementById("num-year");
    numDay.innerText = "- -";
    numMonth.innerText = "- -";
    numYear.innerText = "- -";
}
function makeTheJobDone() {
  deleteSpans();
  errorEmpty();
  if (errorEmptyHappened) {
    resetDate();
    errorEmptyHappened = false;
    return;
  }
  errorInvalid();
  if (errorInvalidHappened) {
    resetDate();
    errorInvalidHappened = false;
    return;
  }
  calcDate();
}
