// SOURCE: SOURCE_HERE

// DESCRIPTION_HERE

// SWITCHING BETWEEN SOLUTIONS:
const NAME_OF_ALGO_HERE = solution_1;

function solution_1 (INPUT_HERE) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

}

// TEST CASES

const equals = require('./_equality-checker');
const func = FUNCTION_NAME_HERE;

// Test case 1
const T1_INPUT_HERE = 'INPUT_HERE';
const T1_expected = 'EXPECTED_OUTPUT_HERE';
const T1_output = func(T1_INPUT_HERE);
console.log(
  equals(T1_output, T1_expected)
    ? 'TEST 1 PASSED'
    : `TEST 1 FAILED: EXPECTED ${T1_expected} BUT GOT ${T1_output}`
);