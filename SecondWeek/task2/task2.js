'use strict';

function digits(string) {
  let evenSum = 0;
  let oddSum = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      if (string[i] % 2 === 0) {
        evenSum += parseInt(string[i]);
      } else {
        oddSum += parseInt(string[i]);
      }
    }
  }
  return [evenSum, oddSum];
}

function letters(string) {
  let upperCount = 0;
  let lowerCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= 'a' && string[i] <= 'z') {
      lowerCount++;
    } else if (string[i] >= 'A' && string[i] <= 'Z') {
      upperCount++;
    }
  }
  return [lowerCount, upperCount];
}

function _sum(string) {
  let num = '';
  let sum = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      num += string[i];
    } else {
      break
    }
  }
  if (num !== '') {
    sum += parseInt(num);
  }
  return sum;
}

let input = '';
let currentSum = 0;
while (input !== null) {
  input = window.prompt('Enter data:');
  if (input !== null) {
    let digitsResult = digits(input);
    let lettersResult = letters(input);
    currentSum += _sum(input);
    console.log('['+digitsResult[1] + ', ' + digitsResult[0] + '] [' + lettersResult[0] + ', ' + lettersResult[1] + '] ' + currentSum);
  }
}

var expect = chai.expect;

describe('digits', () => {
  it('should return 0, 0 for empty string', () => {
    expect(digits('')).to.eql([0, 0]);
  });
  it('should return sum of odd and even digits contained in it for only numbers', () => {
    expect(digits('123')).to.eql([2, 4]);
  });
  it('should return 0, 0 for only letters', () => {
    expect(digits('abc')).to.eql([0, 0]);
  });
  it('should return sum of odd and even digits contained in it for letters followed by numbers', () => {
    expect(digits('abc123')).to.eql([2, 4]);
  });  
  it('should return sum of odd and even digits contained in it for numbers followed by letters', () => {
    expect(digits('123abc')).to.eql([2, 4]);
  });
});

describe('letters', () => {
  it('should return 0, 0 for empty string', () => {
    expect(letters('')).to.eql([0, 0]);
  });
  it('should return the number of lower and upper letters contained in it for only letters', () => {
    expect(letters('abC')).to.eql([2, 1]);
  });
  it('should return 0, 0 for only numbers', () => {
    expect(letters('123')).to.eql([0, 0]);
  });
  it('should return the number of lower and upper letters contained in it for letters followed by numbers', () => {
    expect(letters('aBc123')).to.eql([2, 1]);
  });
  it('should return the number of lower and upper letters contained in it for numbers followed by letters', () => {
    expect(letters('123aBc')).to.eql([2, 1]);
  });
});

describe('_sum', () => {
  it('should return 0 for empty string', () => {
    expect(_sum('')).to.eql(0);
  });
  it('should return the sum of digits contained in it for only numbers', () => {
    expect(_sum('123')).to.eql(123);
  });
  it('should return 0 for only letters', () => {
    expect(_sum('abc')).to.eql(0);
  });
  it('should return 0 for letters followed by numbers', () => {
    expect(_sum('abc123')).to.eql(0);
  });
  it('should return the sum of digits contained in it for numbers followed by letters', () => {
    expect(_sum('123abc')).to.eql(123);
  });
});