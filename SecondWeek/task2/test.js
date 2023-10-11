'use strict';

var expect = require('chai').expect;

// Include your functions here
function digits(string) {
  // Your digits function
}

function letters(string) {
  // Your letters function
}

function sum(string) {
  // Your sum function
}

// Create Mocha test suite
describe('Function Tests', function() {
  describe('digits', function() {
    it('should handle input containing only numbers', function() {
      const result = digits('12345');
      expect(result).to.deep.equal([0, 15]);
    });

    it('should handle input containing only letters', function() {
      const result = digits('abcXYZ');
      expect(result).to.deep.equal([0, 0]);
    });

    it('should handle input with letters followed by numbers', function() {
      const result = digits('abc123');
      expect(result).to.deep.equal([0, 6]);
    });

    it('should handle input with numbers followed by letters', function() {
      const result = digits('456xyz');
      expect(result).to.deep.equal([0, 15]);
    });

    it('should handle an empty string', function() {
      const result = digits('');
      expect(result).to.deep.equal([0, 0]);
    });
  });

  describe('letters', function() {
    it('should handle input containing only numbers', function() {
      const result = letters('12345');
      expect(result).to.deep.equal([0, 0]);
    });

    it('should handle input containing only letters', function() {
      const result = letters('abcXYZ');
      expect(result).to.deep.equal([3, 3]);
    });

    it('should handle input with letters followed by numbers', function() {
      const result = letters('abc123');
      expect(result).to.deep.equal([3, 0]);
    });

    it('should handle input with numbers followed by letters', function() {
      const result = letters('456xyz');
      expect(result).to.deep.equal([3, 3]);
    });

    it('should handle an empty string', function() {
      const result = letters('');
      expect(result).to.deep.equal([0, 0]);
    });
  });
});
