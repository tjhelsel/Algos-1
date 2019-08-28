// SOURCE: A friend tells me that this problem was asked by Bloomberg.

// Given a Binary Search Tree, implement a method called groupIntoArrays that returns an array of "groups", where a "group" is itself an array of all the node values in the BST at a given depth. The groups should appear in the order starting with the deepest nodes, and ending with a group containing only the root.

// For example, given the following BST:

//      50
//     /  \
//   40    60
//  / \    / \
// 35 45  55  65

// Return [ [35, 45, 55, 65], [40, 60], [50] ].

// Note: The BST class with constructor and "insert" method are already provided. The code for this comes from AlgoExpert.

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

  groupIntoArrays() {

    // initializations
    const output = [];              // the final array to be returned
    let currentGroup = [];          // an array of all nodes at a given depth
    let currentNode, currentDepth;  // tracker variables
    let previousDepth = 0;          // tracker variable; used to detect change in depth. initialize at 0
    const queue = [[this, 0]];      // initialize queue with root node. all elements in queue are in this form: [node, depth]

    // while loop to handle queue
    while (queue.length) {

      // update tracker variables and queue
      [currentNode, currentDepth] = queue.shift();

      // handle end of group
      if (currentDepth !== previousDepth) {
        previousDepth = currentDepth;
        output.unshift(currentGroup);
        currentGroup = [];
      }

      // add children to queue, if any
      if (currentNode.left !== null) queue.push([currentNode.left, currentDepth + 1]);
      if (currentNode.right !== null) queue.push([currentNode.right, currentDepth + 1]);

      // process current node
      currentGroup.push(currentNode.value);
    }

    // process final group
    output.unshift(currentGroup);
    return output;
  }

}

// TEST CASES

const equals = require('./_equality-checker');
let testNum = 1;
let input, output, expected;
//const func = FUNCTION_NAME_HERE;

// Test case 1
input = new BST(50)
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
  .insert(90);
expected = [
  [20, 34, 90],
  [33, 80],
  [0, 70],
  [35, 45, 100],
  [40, 60],
  [50],
];
output = input.groupIntoArrays();
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;