// !!! NEED TO DEBUG SOLUTION #1 AND ADD SOLUTION #2 USING MODIFIED KADANE'S ALGORITHM!!!


// SOURCE: LEETCODE https://leetcode.com/problems/gas-station/

// There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to its next station(i + 1).You begin the journey with an empty tank at one of the gas stations.

// Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.

// Note:

// If there exists a solution, it is guaranteed to be unique.
// Both input arrays are non - empty and have the same length.
// Each element in the input arrays is a non - negative integer.

// Example 1:

// Input:
// gas = [1, 2, 3, 4, 5]
// cost = [3, 4, 5, 1, 2]

// Output: 3

// Explanation:
// Start at station 3(index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

// Example 2:

// Input:
// gas = [2, 3, 4]
// cost = [3, 4, 3]

// Output: -1

// Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

// SWITCHING BETWEEN SOLUTIONS:
// const NAME_OF_ALGO_HERE = solution_1;

function canCompleteCircuit (gas, cost) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

  let net = [];
  for (let i = 0; i < gas.length; i++) {
    net[i] = [gas[i] - cost[i], i];
  }

  while (net.length > 1) {
    net = consolidate(net);
    net = rotate(net);
    net = sum(net);
  }

  return net[0] >= 0 ? net[1] : -1;
}

const consolidate = net => net.reduce((arr, currentInterval) => {
  if (!arr.length || (arr[arr.length - 1][0] >= 0) !== (currentInterval[0] >= 0)) {
    arr.push(currentInterval);
  } else {
    arr[arr.length - 1][0] += currentInterval[0];
  }
  return arr;
}, []);

const rotate = net => {
  if (net[0][0] < 0) {
    net.push(net.shift());
  }
  return net;
};

const sum = net => net.reduce((acc, currentInterval, i, arr) => {
  if (i % 2 !== 0) {
    acc.push(i === arr.length - 1
      ? currentInterval
      : [currentInterval[0] + arr[i + 1][0], i]
    );
  }
  return acc;
}, []);

// TEST CASES

const equals = require('./_equality-checker');
let testNum = 1;
let input, output, expected;
const func = canCompleteCircuit;

// Test case 1
input = {
  gas: [1, 2, 3, 4, 5],
  cost: [3, 4, 5, 1, 2],
};
expected = 3;
output = func(...Object.values(input));
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 2
input = {
  gas: [2, 3, 4],
  cost: [3, 4, 3],
};
expected = -1;
output = func(...Object.values(input));
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

// Test case 3
// input = {
//   ARG_1: 'INPUT_HERE',
// };
// expected = 'EXPECTED_HERE';
// output = func(...Object.values(input));
// console.log(
//   equals(output, expected)
//     ? `TEST ${testNum} PASSED`
//     : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
// );
// testNum++;