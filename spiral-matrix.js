// SOURCE: LEETCODE https://leetcode.com/problems/spiral-matrix/

// Given a matrix of m x n elements(m rows, n columns), return all elements of the matrix in spiral order.

// Example 1:

// Input:
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]
// Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]

// Example 2:

// Input:
// [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12]
// ]
// Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

// SWITCHING BETWEEN SOLUTIONS:
const spiralOrder = solution_1;

function solution_1 (matrix, dir, TL, TR, BR, BL) {

  // SOLUTION 1 [O(n*m) time (n and m are the dimensions of the matrix), O(1) space]:
  // 

  // EDGE CASE: EMPTY INPUT OR 1x1 MATRIX
  if (!matrix.length) return [];
  if (matrix.length === 1 && matrix[0].length === 1) return matrix[0];

  // OPTIONAL ARGUMENT DEFAULT VALUES
  dir = dir || 'R';
  TL = TL || [0, 0];
  TR = TR || [0, matrix[0].length - 1];
  BR = BR || [matrix.length - 1, matrix[0].length - 1];
  BL = BL || [matrix.length - 1, 0];

  // BASE CASE: COMPLETED THE MATRIX
  if (TL[0] > BR[0] || TL[1] > BR[1]) return [];

  // INITIALIZATIONS
  const nextDir = { R: 'D', D: 'L', L: 'U', U: 'R' };
  const currentEdge = [];

  // PROCESS CURRENT EDGE BASED ON CURRENT DIRECTION
  switch (dir) {
    case 'R':
      if (TL[1] !== TR[1]) {                      // skip this edge if start and end corners are the same
        for (let i = TL[1]; i <= TR[1]; i++) {    // navigate from start corner to end corner, collecting all elements along the way
          currentEdge.push(matrix[TL[0]][i]);
        }
        TL[0]++;                                  // strip off the edge that was just processed by moving the two relevant corners
        TR[0]++;
      }
      break;
    case 'D':
      if (TR[0] !== BR[0]) {
        for (let i = TR[0]; i <= BR[0]; i++) {
          currentEdge.push(matrix[i][TR[1]]);
        }
        TR[1]--;
        BR[1]--;
      }
      break;
    case 'L':
      if (BR[1] !== BL[1]) {
        for (let i = BR[1]; i >= BL[1]; i--) {
          currentEdge.push(matrix[BR[0]][i]);
        }
        BL[0]--;
        BR[0]--;
      }
      break;
    case 'U':
      if (BL[0] !== TL[0]) {
        for (let i = BL[0]; i >= TL[0]; i--) {
          currentEdge.push(matrix[i][BL[1]]);
        }
        BL[1]++;
        TL[1]++;
      }
      break;
  }
  return currentEdge.concat(spiralOrder(matrix, nextDir[dir], TL, TR, BR, BL));   // concat currentEdge to result of further calls. pass in nextDir and current corners.
};

// TEST CASES

const equals = require('./_equality-checker');
const func = spiralOrder;

// Test case 1
const T1_matrix = [];
const T1_expected = [];
const T1_output = func(T1_matrix);
console.log(
  equals(T1_output, T1_expected)
    ? 'TEST 1 PASSED'
    : `TEST 1 FAILED: EXPECTED ${T1_expected} BUT GOT ${T1_output}`
);

// Test case 2
const T2_matrix = [
  [1],
];
const T2_expected = [1];
const T2_output = func(T2_matrix);
console.log(
  equals(T2_output, T2_expected)
    ? 'TEST 2 PASSED'
    : `TEST 2 FAILED: EXPECTED ${T2_expected} BUT GOT ${T2_output}`
);


// Test case 3
const T3_matrix = [
  [1, 2, 3, 4, 5],
];
const T3_expected = [1, 2, 3, 4, 5];
const T3_output = func(T3_matrix);
console.log(
  equals(T3_output, T3_expected)
    ? 'TEST 3 PASSED'
    : `TEST 3 FAILED: EXPECTED ${T3_expected} BUT GOT ${T3_output}`
);

// Test case 4
const T4_matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const T4_expected = [1, 2, 3, 6, 9, 8, 7, 4, 5];
const T4_output = func(T4_matrix);
console.log(
  equals(T4_output, T4_expected)
    ? 'TEST 4 PASSED'
    : `TEST 4 FAILED: EXPECTED ${T4_expected} BUT GOT ${T4_output}`
);

// Test case 5
const T5_matrix = [[2, 5], [8, 4], [0, -1]];
const T5_expected = [2, 5, 4, -1, 0, 8];
const T5_output = func(T5_matrix);
console.log(
  equals(T5_output, T5_expected)
    ? 'TEST 5 PASSED'
    : `TEST 5 FAILED: EXPECTED ${T5_expected} BUT GOT ${T5_output}`
);