function printFormValues() {
    var form = document.forms[0];
    var textValue = form.elements["text_field"].value;
    var numberValue = form.elements["number_field"].value;
  
    var textType = isNaN(textValue) ? typeof textValue : "string";
    var numberType = isNaN(numberValue) ? typeof parseFloat(numberValue) : "number";
  
    console.log("loadedTextFieldValue: " + textValue + " " + textType);
    console.log("loadedValueFromNumericField: " + numberValue + " " + numberType);
  }
  