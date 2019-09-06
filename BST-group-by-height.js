// SOURCE: A friend tells me that this problem was asked by Bloomberg.

// Given a Binary Search Tree, implement a method called groupByHeight that returns an array of all the nodes organized into "groups", where a "group" is itself an array of all the node values in the BST at a given height. The height of a node is 0 if it is a leaf, or else it is 1 greater than the highest height among its children. The groups should appear in the order starting with the leaf nodes (height 0), and ending with a group containing only the root (greatest height).

// For example, given the following BST:

//            40
//           /  \
//         20    45
//         / \
//       15   30
//       /    / \
//     10    25  35
//    /
//   5

// Return [ [5, 25, 35, 45], [10, 30], [15], [20], [40] ] because those groups have heights 0, 1, 2, 3, 4.

// Note: The BST class with constructor and "insert" method are already provided. This is a MODIFIED VERSION of code from AlgoExpert.

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
    return this;
  }

  // SWITCHING BETWEEN SOLUTIONS:
  // const NAME_OF_ALGO_HERE = solution_1;

  groupByHeight() {
    const [_, memo] = this.getHeightsOfNodes();
    return memo;
  }

  // HELPER FUNCTION
  
  getHeightsOfNodes(memo = []) {
    let height;
    if (!this.left && !this.right) {
      height = 0;
    } else if (!this.right) {
      height = this.left.getHeightsOfNodes(memo)[0] + 1;
    } else if (!this.left) {
      height = this.right.getHeightsOfNodes(memo)[0] + 1;
    } else {
      height = Math.max(this.left.getHeightsOfNodes(memo)[0], this.right.getHeightsOfNodes(memo)[0]) + 1;
    }
    memo[height] = memo[height] || [];
    memo[height].push(this.value);
    return [height, memo];
  }

}

// TEST CASES

const equals = require('./_equality-checker');
const test = (output, expected, testNum) => {
  console.log(
    equals(output, expected)
      ? `TEST ${testNum[0]} PASSED`
      : `TEST ${testNum[0]} FAILED: EXPECTED ${expected} BUT GOT ${output}`
  );
  testNum[0]++;
};
const testNum = [1];
let input, output, expected;
//const func = FUNCTION_NAME_HERE;

// Test case 1
input = {
  BST: new BST(40)
    .insert(20)
    .insert(15)
    .insert(10)
    .insert(5)
    .insert(30)
    .insert(25)
    .insert(35)
    .insert(45),
  args: {

  },
};
expected = [
  [5, 25, 35, 45],
  [10, 30],
  [15],
  [20],
  [40],
];
output = input.BST.groupByHeight();
test(output, expected, testNum);

// Test case 2
input = {
  BST: new BST(50)
    .insert(40)
    .insert(60)
    .insert(35)
    .insert(45)
    .insert(100)
    .insert(0)
    .insert(70)
    .insert(33)
    .insert(80)
    .insert(20)
    .insert(34)
    .insert(90),
  args: {

  },
};
expected = [
  [20, 34, 45, 90],
  [33, 80],
  [0, 70],
  [35, 100],
  [40, 60],
  [50],
];
output = input.BST.groupByHeight();
test(output, expected, testNum);