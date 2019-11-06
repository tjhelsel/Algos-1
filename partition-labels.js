// SOURCE: LEETCODE (https://leetcode.com/problems/partition-labels/submissions/)

// A string S of lowercase letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

// Example 1:

// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]

// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

// Note:

// S will have length in range [1, 500].
// S will consist of lowercase letters ('a' to 'z') only.

// SWITCHING BETWEEN SOLUTIONS:
const partitionLabels = solution_1;

function solution_1 (S) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // description

  const partitions = flattenArray(cutString(S));
  return partitions.map(partition => partition.length);

  // HELPER FUNCTIONS BELOW

  function cutString (S) {   
    const letterTerminals = {};
    for (let i = 0; i < S.length; i++) {
      if (!(S[i] in letterTerminals)) {
        letterTerminals[S[i]] = {first: i, last: i};
      } else {
        letterTerminals[S[i]].last = i;
      }
    }
    for (let i = 1; i < S.length; i++) {
      if (Object.keys(letterTerminals).every(letter =>
        i <= letterTerminals[letter].first || i > letterTerminals[letter].last
      )) {
        return [cutString(S.slice(0, i)), cutString(S.slice(i))];
      }
    }
    return [S];
  };

  function flattenArray (A) {
    const output = [];
    A.forEach(element => {
      if (Array.isArray(element)) {
        output.push(...flattenArray(element))
      } else {
        output.push(element);
      }
    });
    return output;
  };

}

function cutString (S) {   
  const letterTerminals = {};
  for (let i = 0; i < S.length; i++) {
    if (!(S[i] in letterTerminals)) {
      letterTerminals[S[i]] = {first: i, last: i};
    } else {
      letterTerminals[S[i]].last = i;
    }
  }
  for (let i = 1; i < S.length; i++) {
    if (Object.keys(letterTerminals).every(letter =>
      i <= letterTerminals[letter].first || i > letterTerminals[letter].last
    )) {
      return [cutString(S.slice(0, i)), cutString(S.slice(i))];
    }
  }
  return [S];
};

function flattenArray (A) {
  const output = [];
  A.forEach(element => {
    if (Array.isArray(element)) {
      output.push(...flattenArray(element))
    } else {
      output.push(element);
    }
  });
  return output;
};

function solution_2 (S) {

  // SOLUTION 2 [O(n) time, O(n) space]:
  // description

  // STEP 1: FIND LETTER TERMINALS
  const letterTerminals = {};
  for (let i = 0; i < S.length; i++) {
    letterTerminals[S[i]] = i;
  }
  
  // STEP 2: GREEDILY FIND SMALLEST POSSIBLE LEFT PARTITION, AND REPEAT UNTIL WHOLE STRING IS PROCESSED
  const output = [];                                  // stores the string partitions as we find them
  let partitionStart = 0;                             // initial values
  let highestTerminal = letterTerminals[S[0]];        // initial values
  for (let i = 0; i < S.length; i++) {
    highestTerminal = Math.max(highestTerminal, letterTerminals[S[i]]);   // update highestTerminal?
    if (i === highestTerminal) {                                          // if i hits highestTerminal then that's a partition
      output.push(S.slice(partitionStart, highestTerminal + 1));
      if (i < S.length - 1) {                                             // only update if not last letter, else crash
        partitionStart = highestTerminal + 1;
        highestTerminal = letterTerminals[S[partitionStart]];
      }
    }
  }
  
  return output.map(partition => partition.length);
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = partitionLabels;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  S: 'ababcbacadefegdehijhklij',
};
expected = [9, 7, 8];
test(func, input, expected, testNum, lowestTest, highestTest);

// // Test case 2
// input = {
//   S: 'INPUT_HERE',
// };
// expected = 'EXPECTED_HERE';
// test(func, input, expected, testNum, lowestTest, highestTest);

// // Test case 3
// input = {
//   S: 'INPUT_HERE',
// };
// expected = 'EXPECTED_HERE';
// test(func, input, expected, testNum, lowestTest, highestTest);