// SOURCE: A friend tells me that this problem was asked by Uber.

// Given an array of length n representing amounts of cash that each of n friends contributed toward a restaurant bill (and optionally also given the total amount of the bill as an argument - you can assume that this redundant information is accurate), determine who needs to pay back what amounts directly to whom such that everyone ends up paying an equal amount - you can choose how you want to represent this data. For purposes of this exercise we will use an object literal. The object's keys should be the index values of people who need to pay (debtors), and the values should be further objects with keys that are the index values of people who need to collect (creditors), and the values should be the amounts transacted between the individual debtor and creditor.

// SWITCHING BETWEEN SOLUTIONS:
// const NAME_OF_ALGO_HERE = solution_1;

function splitBill (payments, total) {

  // SOLUTION 1 [O(???) time, O(???) space]:
  // 

  // EDGE CASE: EMPTY PAYMENTS INPUT
  if (!payments.length) return {};

  // CALCULATE TOTAL IF NOT PROVIDED IN INPUT
  total = total || payments.reduce((sum, payment) => sum + payment);

  // INITIALIZATIONS
  const average = total / payments.length;
  const debts = payments.map((payment, i) => [i, payment - average]);
  const creditors = debts.filter(person => person[1] > 0);
  const debtors = debts.filter(person => person[1] < 0);
  const transactions = {};

  while (debtors.length) {
    //
    transactions[debtors[0][0]] = transactions[debtors[0][0]] || {};
    transactions[debtors[0][0]][creditors[0][0]] = Math.min(-debtors[0][1], creditors[0][1]);
    if (creditors[0][1] + debtors[0][1] > 0) {
      creditors[0][1] += debtors[0][1];
      debtors.shift();
    } else if (creditors[0][1] + debtors[0][1] < 0) {
      debtors[0][1] += creditors[0][1];
      creditors.shift();
    } else {
      debtors.shift();
      creditors.shift();
    }
  }
  return transactions;
}

// TEST CASES

const equals = require('./_equality-checker');
let testNum = 1;
let input, output, expected;
const func = splitBill;

// Test case 1
input = {
  payments: [12, 5, 9, 0, 3, 6, 4, 1, 2, 8],
};
expected = {
  3: { 0: 5 },
  4: { 0: 2 },
  6: { 2: 1 },
  7: { 2: 3, 5: 1 },
  8: { 9: 3 },
};
output = func(...Object.values(input));

console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 2
input = {
  payments: [26, 31, 18, 16, 9],
};
expected = {
  2: { 0: 2 },
  3: { 0: 4 },
  4: { 1: 11 },
};
output = func(...Object.values(input));

console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 3
input = {
  payments: [37, 0, 6, 12, 4, 12, 1, 8],
};
expected = {
  1: { 0: 10 },
  2: { 0: 4 },
  4: { 0: 6 },
  6: { 0: 7, 3: 2 },
  7: { 5: 2 },
};
output = func(...Object.values(input));

console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;