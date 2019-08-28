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
let testNum = 1;
let input, output, expected;
const func = FUNCTION_NAME_HERE;

// Test case 1
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
output = func(...Object.values(input));
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 2
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
output = func(...Object.values(input));
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 3
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
output = func(...Object.values(input));
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;