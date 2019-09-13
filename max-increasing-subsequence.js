// NEED TO ADD O(n^2) METHOD!!!


// SOURCE: ALGOEXPERT

// Given a non-empty array of integers, write a function that returns an array of length 2. The first element in the output array should be an
// integer value representing the greatest sum that can be generated from a strictly-increasing subsequence in the array. The second element
// should be an array of the numbers in that subsequence. A subsequence is defined as a set of numbers that are not necessarily adjacent but
// that are in the same order as they appear in the array. Assume that there will be only be one increasing subsequence with the greatest sum.

// SWITCHING BETWEEN SOLUTIONS:
const maxSumIncreasingSubsequence = solution_1;

function solution_1(array) {

  // SOLUTION 1 [O(2^n) time, O(2^n) space]:
  // description

  // INITIALIZATIONS
  const memo = {};
  let highestSoFar = -Infinity;

  // ITERATE THROUGH ARRAY
  for (let num of array) {

    // FIRST, CONSIDER THE POSSIBILITY THAT num STANDS ALONE
    if (num > highestSoFar) highestSoFar = num;   // num itself is a potential record holder
    memo[num] = memo[num] || [num];               // [num] is always a subsequence, but DO NOT update memo if an entry already exists at num. we may wish to add num to that subsequence!

    // SECOND, CYCLE THROUGH EXISTING KEYS TO CHECK FOR SUBSEQUENCES WHERE num COULD BE ADDED ON TO THE END...
    if (Object.keys(memo).length) for (let key in memo) {             // ...thus, memo cannot be empty
      const subsequence = memo[key];
      if (subsequence[subsequence.length - 1] < num) {                // IMPORTANT: num could only be added on to a subsequence with a final number less than num
        const newTotal = Number(key) + num;
        if (newTotal > highestSoFar) highestSoFar = newTotal;         // newTotal is a potential record holder
        memo[newTotal] = memo[newTotal] || subsequence.concat(num);   // DO NOT update memo if an entry already exists at newTotal. we may wish to add num to that subsequence!
      }
    }
  }

  return [highestSoFar, memo[highestSoFar]];      // return record holder, and the subsequence associated with the record holder
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, output, expected;
const func = maxSumIncreasingSubsequence;

// Test case 1
input = {
  array: [1],
};
expected = [1, [1]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 2
input = {
  array: [-1],
};
expected = [-1, [-1]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 3
input = {
  array: [-1, 1],
};
expected = [1, [1]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 4
input = {
  array: [5, 4, 3, 2, 1],
};
expected = [5, [5]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 5
input = {
  array: [1, 2, 3, 4, 5],
};
expected = [15, [1, 2, 3, 4, 5]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 6
input = {
  array: [-5, -4, -3, -2, -1],
};
expected = [-1, [-1]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 7
input = {
  array: [10, 70, 20, 30, 50, 11, 30],
};
expected = [110, [10, 20, 30, 50]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 8
input = {
  array: [8, 12, 2, 3, 15, 5, 7],
};
expected = [35, [8, 12, 15]];
output = func(...Object.values(input));
test(output, expected, testNum);

// Test case 9
input = {
  array: [10, 15, 4, 5, 11, 14, 31, 25, 31, 23, 25, 31, 50],
};
expected = [164, [10, 11, 14, 23, 25, 31, 50]];
output = func(...Object.values(input));
test(output, expected, testNum);