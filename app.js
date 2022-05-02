const inputPercent = document.querySelectorAll('.inputPercent');
const tipAmount = document.querySelector('#tipAmount');
const totalAmount = document.querySelector('#totalAmount');
const form = document.querySelector('.tipSplitter');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const customInput = document.querySelector(".custom-input");
const messageElement = document.querySelector("#message");
const nbrOfPeopleInput = document.querySelector('#numberPeople');

function onKeyupBillInput() {
    showResults();
  }
  
  function onChangeBillInput() {
    showResults();
  }

//choosing a checkbox
function checkOne(checkbox) {
    checkboxes.forEach((element) => {
      if (element !== checkbox) {
        element.checked = false;
      }
    });
  
    if (checkbox.checked === true) {
      customInput.disabled = true;
      customInput.value = "";
    } else {
      customInput.disabled = false;
    }
  
    showResults();
  }
  
  function onKeyupCustomTipInput() {
    showResults();
  }
  
  function onChangeCustomTipInput() {
    showResults();
  }

  function onKeyupNbrPeople() {
    if (parseFloat(form.numberPeople.value) === 0 || form.numberPeople.value === "") {
        
        nbrOfPeopleInput.classList.add("error");
        console.log('here');
       messageElement.classList.remove("hide");
    } else {
        nbrOfPeopleInput.classList.remove("error");
        messageElement.classList.add("hide");
    }
  
    showResults();
  }

  function onChangeNbrPeople() {
    showResults();
  }



function showResults() {
    const bill = getBill();
    const nbrOfPeople = getNbrOfPeople();
    let tip;
    if (tipChecked() !== 0) {
      tip = tipChecked();
    } else {
      tip = getCustomTip();
      
    }
    if (bill === 0 || nbrOfPeople === 0 || tip === 0) {
      tipAmount.innerHTML = 0;
      totalAmount.innerHTML = 0;
    } else {
      const tipAmountPerson = parseFloat(
        calcTipAmountPerson(bill, tip, nbrOfPeople)
      );
      tipAmount.innerHTML = tipAmountPerson;
      totalAmount.innerHTML = calcTotalPerson(bill, nbrOfPeople, tipAmountPerson);
    }
  }

// calc tip amount per person
function calcTipAmountPerson(bill, tip, nbrOfPeople) {
    return parseFloat((bill * (tip / 100)) / nbrOfPeople).toFixed(2);
  }
  
  // calcl total per person
  function calcTotalPerson(bill, nbrOfPeople, tipAmountPerson) {
    return parseFloat(bill / nbrOfPeople + tipAmountPerson).toFixed(2);
  }

  // get tip checked if there is no type checked return 0
function tipChecked() {
    let value = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === true) {
        value = checkbox.value;
      }
    });
  
    return parseFloat(value);
  }

  function getCustomTip() {
    let customTip = customInput.value;
  
    if (parseFloat(customTip) >= 0) {
      return parseFloat(customTip);
    } else {
      return 0;
    }
  }

  function getBill() {
    let bill = form.totalBillInput.value;
  
    if (parseFloat(bill) >= 0) {
      return parseFloat(bill);
    } else {
      return 0;
    }
  }

  function getNbrOfPeople() {
    let numberPeople = form.numberPeople.value;
    if (parseFloat(numberPeople) >= 0) {
      return parseFloat(numberPeople);
    } else {
      return 0;
    }
  }

