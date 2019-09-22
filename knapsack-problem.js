// SOURCE: ALGOEXPERT

// You are given an array of arrays. Each subarray in this array holds two integer values and represents an item; the first integer is the item's value, and the second integer is the item's weight. You are also given an integer representing the maximum capacity of a knapsack that you have. Your goal is to fit items in your knapsack, all the while maximizing their combined value. Note that the sum of the weights of the items that you pick cannot exceed the knapsack's capacity. Write a function that returns the maximized combined value of the items that you should pick, as well as an array of the indices of each item picked. Assume that there will only be one combination of items that maximizes the total value in the knapsack.

// Sample input: [ [1,2] , [4,3] , [5,6] , [6,7] ], 10
// Sample output: [ 10, [1,3] ]

// SWITCHING BETWEEN SOLUTIONS:
const knapsackProblem = solution_1;

function solution_1 (items, capacity) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

  // INITIALIZATIONS
  const maxValuesAndIndices = [];
  for (let i = 0; i <= capacity; i++) maxValuesAndIndices[i] = [0, []];

  // ITERATE THROUGH ALL ITEMS, DYNAMICALLY UPDATING THE maxValuesAndIndices ARRAY
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

    // intialize item component references
    const [itemValue, itemWeight] = items[itemIndex];

    // iterate through maxValuesAndIndices (starting at i === itemWeight), dynamically making updates
    for (let i = itemWeight; i <= capacity; i++) {
      
      // initialize maxValuesAndIndices component references
      const [currentValue, currentIndices] = maxValuesAndIndices[i];

      // if previous configuration yields higher value, copy that configuration
      if (maxValuesAndIndices[i - 1][0] > currentValue) maxValuesAndIndices[i] = [...maxValuesAndIndices[i - 1]];

      // if adding current item to the configuration looking backward by itemWeight yields higher value, use that configuration
      if (maxValuesAndIndices[i - itemWeight][0] > currentValue) {
        currentValue += itemValue;
        currentIndices.push(itemIndex);
      }

    }

  }

  return maxValuesAndIndices[capacity];
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, output, expected;
const func = knapsackProblem;
const lowestTest = 1 || 0;
const highestTest = 1 || Infinity;

// Test case 1
input = {
  items: [
    [1, 2],
    [4, 3],
    [5, 6],
    [6, 7],
  ],
  capacity: 10,
};
expected = [10, [1,3]];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  items: [
    [465, 100],
    [400, 85],
    [255, 55],
    [350, 45],
    [650, 130],
    [1000, 190],
    [455, 100],
    [100, 25],
    [1200, 190],
    [320, 65],
    [750, 100],
    [50, 45],
    [550, 65],
    [100, 50],
    [600, 70],
    [240, 40],
  ],
  capacity: 200,
};
expected = [1500, [3, 12, 14]];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  items: [
    [465, 100],
    [400, 85],
    [255, 55],
    [350, 45],
    [650, 130],
    [1000, 190],
    [455, 100],
    [100, 25],
    [1200, 190],
    [320, 65],
    [750, 100],
    [50, 45],
    [550, 65],
    [100, 50],
    [600, 70],
    [255, 40],
  ],
  capacity: 200,
};
expected = [1505, [7, 12, 14, 15]];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  items: [
    [2, 1],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 100,
};
expected = [101, [0, 2, 3]];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  items: [
    [1, 2],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 100,
};
expected = [100, [1, 2]];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  items: [
    [1, 2],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 0,
};
expected = [0, []];
output = func(...Object.values(input));
test(output, expected, testNum, lowestTest, highestTest);