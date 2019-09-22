const equals = require('./_equality-checker');

function test (output, expected, testNum, lowestTest = 0, highestTest = Infinity) {
  if (testNum >= lowestTest && testNum <= highestTest) {
    console.log(
      equals(output, expected)
        ? `TEST ${testNum[0]} PASSED`
        : `TEST ${testNum[0]} FAILED: EXPECTED ${expected} BUT GOT ${output}`
    );
  }
  testNum[0]++;
};

module.exports = test;