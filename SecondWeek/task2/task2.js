'use strict';

var expect = chai.expect;

function digits(string) {
  var evenSum = 0;
  var oddSum = 0;

  for (let i = 0; i < string.length; i++) {
    var digit = parseInt(string[i]);

    if (!isNaN(digit)) {
      if (digit % 2 === 0) {
        evenSum += digit;
      } else {
        oddSum += digit;
      }
    }
  }

  return [evenSum, oddSum];
}

function letters(string) {
  var lowerCount = 0;
  var upperCount = 0;

  for (let char of string) {
    if (/[a-z]/.test(char)) {
      lowerCount++;
    } else if (/[A-Z]/.test(char)) {
      upperCount++;
    }
  }

  return [lowerCount, upperCount];
}

function sum(string) {
  var total = 0;

  while (string !== null) {
    var number = parseFloat(string);
    if (!isNaN(number)) {
      total += number;
      // Check if the next character is a non-digit character
      if (/[^0-9]/.test(string[string.length])) {
        break;
      }
      string = prompt("Enter data:");
    } else {
      break;
    }
  }

  return total;
}


function processData() {
  var string = prompt("Enter data:");
  var numberResult = digits(string);
  var letterResult = letters(string);
  var sumResult = sum(string);

  console.log(numberResult[0], numberResult[1], letterResult[0], letterResult[1], sumResult);
}

// Call the processData function to start the process
processData();
