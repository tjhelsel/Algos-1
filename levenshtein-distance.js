// SOURCE: AlgoExpert

// Write a function that takes in two strings and returns the minimum number of edit operations that need to be performed on the first string to obtain the second string. There are three edit operations: insertion of a character, deletion of a character, and substitution of a character for another.

// Sample input: "abc", "yabd"
// Sample output: 2 (insert "y"; substitute "c" for "d")

// SWITCHING BETWEEN SOLUTIONS:
const levenshteinDistance = solution_1;

function solution_1 (str1, str2) {

  // SOLUTION 1 [O(n*m) time, O(min(n, m)) space]:
  
  // create a levenshtein table such that the rows correspond to a slice of str1 up to the next marginal letter (starting with ''), and likewise
  // the columns correspond to a slice of str2 up to the next marginal letter (starting with ''). the table contains numbers at (row, col) which
  // represents the levenshtein edit distance between the current str1 and str2 slices.
  
  // the entire '' row will be 0, 1, 2, ... up to the length of str2, while the entire '' column will be 0, 1, 2, ... up to the length of str1.
  
  // the rest of the table is dynamically populated according to this rule: if the current marginal letter in the column matches that of the row,
  // go up 1 and left 1 in the table and grab that number. else, take the min of the 3 neighboring numbers (up left, up, and left) and add 1.

  // the final number of the final row (bottom right of the table) is the answer to be returned.

  // for full optimization, rather than saving the entire table, you only need to save two rows at a time. call these previousRow and currentRow.
  // to take up less space, make sure the SHORTER string goes across the top (corresponding to the columns). initialize previousRow with 0, 1, 2,
  // ... up to the length of str2. initialize the first value of currentRow. then use the algo above to populate the rest of currentRow. then sub
  // currentRow into previousRow and keep going until the table is finished.

  // EDGE CASE - the two input strings are the same (primarily this catches '' and '')
  if (str1 === str2) return 0;

  // INITIALIZATIONS

  // determine which string is longer and which is shorter
  let longerStr = (str1.length > str2.length) ? str1 : str2;
  let shorterStr = (str1.length > str2.length) ? str2 : str1;

  // initialize two arrays to hold current and previous rows of levenshtein table
  let previousRow = [];
  let currentRow = [];

  // initialize previousRow based on ''
  for (let i = 0; i <= shorterStr.length; i++) {
    previousRow.push(i);
  }

  // iterate through longerStr, starting with its first letter
  for (let i = 0; i < longerStr.length; i++) {
    currentRow = [i + 1];                             // first value of each row is always 1 greater than that of previous row - this is also i + 1
    for (let j = 0; j < shorterStr.length; j++) {
      currentRow.push(
        longerStr[i] === shorterStr[j]                // note that i/j is shifted for the strings vs the rows of nums
          ? previousRow[j]                            // num to the top left
          : Math.min(
              previousRow[j],                         // num to the top left
              previousRow[j + 1],                     // num above
              currentRow[j]                           // num to the left
            ) + 1
      );
    }
    previousRow = currentRow;                         // sub currentRow into previousRow
  }

  return currentRow[currentRow.length - 1];           // return last element of currentRow
}

// TEST CASES

const equals = require('./_equality-checker');

// Test case 1
const T1_str1 = '';
const T1_str2 = '';
const T1_expected = 0;
const T1_output = levenshteinDistance(T1_str1, T1_str2);
console.log(
  equals(T1_output, T1_expected)
    ? 'TEST 1 PASSED'
    : `TEST 1 FAILED: EXPECTED ${T1_expected} BUT GOT ${T1_output}`
);

// Test case 2
const T2_str1 = '';
const T2_str2 = 'abc';
const T2_expected = 3;
const T2_output = levenshteinDistance(T2_str1, T2_str2);
console.log(
  equals(T2_output, T2_expected)
    ? 'TEST 2 PASSED'
    : `TEST 2 FAILED: EXPECTED ${T2_expected} BUT GOT ${T2_output}`
);

// Test case 3
const T3_str1 = 'abc';
const T3_str2 = 'abc';
const T3_expected = 0;
const T3_output = levenshteinDistance(T3_str1, T3_str2);
console.log(
  equals(T3_output, T3_expected)
    ? 'TEST 3 PASSED'
    : `TEST 3 FAILED: EXPECTED ${T3_expected} BUT GOT ${T3_output}`
);

// Test case 4
const T4_str1 = 'abc';
const T4_str2 = 'abx';
const T4_expected = 1;
const T4_output = levenshteinDistance(T4_str1, T4_str2);
console.log(
  equals(T4_output, T4_expected)
    ? 'TEST 4 PASSED'
    : `TEST 4 FAILED: EXPECTED ${T4_expected} BUT GOT ${T4_output}`
);

// Test case 5
const T5_str1 = 'abc';
const T5_str2 = 'abcx';
const T5_expected = 1;
const T5_output = levenshteinDistance(T5_str1, T5_str2);
console.log(
  equals(T5_output, T5_expected)
    ? 'TEST 5 PASSED'
    : `TEST 5 FAILED: EXPECTED ${T5_expected} BUT GOT ${T5_output}`
);

// Test case 6
const T6_str1 = 'abc';
const T6_str2 = 'yabcx';
const T6_expected = 2;
const T6_output = levenshteinDistance(T6_str1, T6_str2);
console.log(
  equals(T6_output, T6_expected)
    ? 'TEST 6 PASSED'
    : `TEST 6 FAILED: EXPECTED ${T6_expected} BUT GOT ${T6_output}`
);

// Test case 7
const T7_str1 = 'algoexpert';
const T7_str2 = 'algozexpert';
const T7_expected = 1;
const T7_output = levenshteinDistance(T7_str1, T7_str2);
console.log(
  equals(T7_output, T7_expected)
    ? 'TEST 7 PASSED'
    : `TEST 7 FAILED: EXPECTED ${T7_expected} BUT GOT ${T7_output}`
);

// Test case 8
const T8_str1 = 'abcdefghij';
const T8_str2 = '1234567890';
const T8_expected = 10;
const T8_output = levenshteinDistance(T8_str1, T8_str2);
console.log(
  equals(T8_output, T8_expected)
    ? 'TEST 8 PASSED'
    : `TEST 8 FAILED: EXPECTED ${T8_expected} BUT GOT ${T8_output}`
);

// Test case 9
const T9_str1 = 'abcdefghij';
const T9_str2 = 'a234567890';
const T9_expected = 9;
const T9_output = levenshteinDistance(T9_str1, T9_str2);
console.log(
  equals(T9_output, T9_expected)
    ? 'TEST 9 PASSED'
    : `TEST 9 FAILED: EXPECTED ${T9_expected} BUT GOT ${T9_output}`
);

// Test case 10
const T10_str1 = 'biting';
const T10_str2 = 'mitten';
const T10_expected = 4;
const T10_output = levenshteinDistance(T10_str1, T10_str2);
console.log(
  equals(T10_output, T10_expected)
    ? 'TEST 10 PASSED'
    : `TEST 10 FAILED: EXPECTED ${T10_expected} BUT GOT ${T10_output}`
);

// Test case 11
const T11_str1 = 'cereal';
const T11_str2 = 'saturday';
const T11_expected = 6;
const T11_output = levenshteinDistance(T11_str1, T11_str2);
console.log(
  equals(T11_output, T11_expected)
    ? 'TEST 11 PASSED'
    : `TEST 11 FAILED: EXPECTED ${T11_expected} BUT GOT ${T11_output}`
);

// Test case 12
const T12_str1 = 'cereal';
const T12_str2 = 'saturdzz';
const T12_expected = 7;
const T12_output = levenshteinDistance(T12_str1, T12_str2);
console.log(
  equals(T12_output, T12_expected)
    ? 'TEST 12 PASSED'
    : `TEST 12 FAILED: EXPECTED ${T12_expected} BUT GOT ${T12_output}`
);

// Test case 13
const T13_str1 = 'abbbbbbbbb';
const T13_str2 = 'bbbbbbbbba';
const T13_expected = 2;
const T13_output = levenshteinDistance(T13_str1, T13_str2);
console.log(
  equals(T13_output, T13_expected)
    ? 'TEST 13 PASSED'
    : `TEST 13 FAILED: EXPECTED ${T13_expected} BUT GOT ${T13_output}`
);

// Test case 14
const T14_str1 = 'abc';
const T14_str2 = 'yabd';
const T14_expected = 2;
const T14_output = levenshteinDistance(T14_str1, T14_str2);
console.log(
  equals(T14_output, T14_expected)
    ? 'TEST 14 PASSED'
    : `TEST 14 FAILED: EXPECTED ${T14_expected} BUT GOT ${T14_output}`
);

// Test case 15
const T15_str1 = 'xabc';
const T15_str2 = 'abcx';
const T15_expected = 2;
const T15_output = levenshteinDistance(T15_str1, T15_str2);
console.log(
  equals(T15_output, T15_expected)
    ? 'TEST 15 PASSED'
    : `TEST 15 FAILED: EXPECTED ${T15_expected} BUT GOT ${T15_output}`
);