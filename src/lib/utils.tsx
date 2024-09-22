import { Square } from "./interfaces";

/**
 * Generates an array of numbers from zero to length -1. Numbers will be
 * returned in ascending order unless the 'randomize' number is set to true.
 * @param length number
 * @param randomize boolean
 * @returns number[]
 */
export const generateNumbersArray = (length: number, randomize: boolean): number[] => {
  let numbersArray: number[] = [];

  for (let i: number = 0; i < length; ++i) numbersArray[i] = i;

  if (randomize) {
    numbersArray = shuffleNumberArray(numbersArray);
  }

  return numbersArray;
};

/**
 * Randomizes the given array of numbers.
 * @param array number[]
 * @returns number[]
 */
const shuffleNumberArray = (array: number[]): number[] => {
  let tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

/**
 * Returns the initials from the given name.
 * @param name string
 * @returns string
 */
export const getInitialsFromName = (name: string): string => {
  return name
    .split(" ")
    .map((namePart: string) => {
      return namePart.charAt(0);
    })
    .join("");
};

export const generateSquaresArray = (rows: number, cols: number): Square[][] => {
  const squares: Square[][] = [];

  for (let i = 0; i < rows; i++) {
    const squaresRow: Square[] = [];

    for (let j = 0; j < cols; j++) {
      const square: Square = {
        player: {
          name: "",
          initials: "",
        },
        highlights: [],
        row: i,
        col: j,
      };

      squaresRow.push(square);
    }
    squares.push(squaresRow);
  }
  
  return squares
};
