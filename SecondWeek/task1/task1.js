window.prompt("Text1","Text2");
function executeFourTimes() {
  for (let i = 0; i < 4; i++) {
    let loadedValue = window.prompt("Enter a value:");
    console.log(`${loadedValue} : ${typeof loadedValue}`);
  }
}

executeFourTimes();

function printValues() {
  let loadedTextFieldValue = document.forms[0].elements[0].value;
  let loadedValueFromNumericField = document.forms[0].elements[1].value;
  console.log(`${loadedTextFieldValue}: ${typeof loadedTextFieldValue}`);
  console.log(`${loadedValueFromNumericField}: ${typeof loadedValueFromNumericField}`);
}