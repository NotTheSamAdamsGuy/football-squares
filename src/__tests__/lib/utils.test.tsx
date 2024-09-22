import { generateNumbersArray, getInitialsFromName } from "../../lib/utils";

test("should return an array of numbers [0, 1, 2]", () => {
  const numbersArray = generateNumbersArray(3, false);
  expect(numbersArray).toEqual([0, 1, 2]);
});

// note: this test may occasionally fail if the random numbers are in numerical order
test("should return an array of randomized numbers", () => {
  const numbersArray = generateNumbersArray(10, true);
  expect(numbersArray).not.toEqual([0,1,2,3,4,5,6,7,8,9]);
});

test("should return the initials 'TP'", () => {
  expect(getInitialsFromName("Test Player")).toEqual("TP");
});