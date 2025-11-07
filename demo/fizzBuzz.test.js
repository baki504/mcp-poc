const { fizzBuzz } = require('./fizzBuzz');

test('fizzBuzz returns correct values', () => {
  expect(fizzBuzz(1)).toBe("1");
  expect(fizzBuzz(3)).toBe("Fizz");
  expect(fizzBuzz(5)).toBe("Buzz");
  expect(fizzBuzz(15)).toBe("FizzBuzz");
});