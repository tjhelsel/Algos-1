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
    this.value = value === undefined ? null : value;  // in case new BST is instantiated with no value
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (this.value === null) {          // if BST was instantiated with no value, the first call of insert will insert the new value into root
      this.value = value;
    } else if (value < this.value) {
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

    // SOLUTION 1 [O(n) time, O(n) space]:

    // optionally create a copy of the tree if you can't mutate the original tree, using copyTree method (pre-order traversal). note that i had to
    // modify the constructor and insert methods of the BST class slightly to achieve this... not sure if there's a better way. then, navigate the
    // tree (or its copy) and add a 'height' property to each node. the height will be 0 if leaf, or else 1 greater than the larger height of its
    // children. while navigating the tree, add the height information to a dictionary containing an array of all node values that fall under each
    // possible height. finally, use the memo to generate the desired output: an array of values, grouped by node height, from lowest height to
    // highest.

    // COPY THE TREE (IF YOU DON'T WANT TO MUTATE ORIGINAL DATA) USING PRE-ORDER TRAVERSAL
    const copy = this.copyTree();

    // TURN THE VALUE OF EACH NODE INTO THAT NODE'S HEIGHT USING HELPER FUNCTION WITH POST-ORDER TRAVERSAL
    const memo = copy.getMemoOfNodeHeights();

    // USE TREE OF HEIGHT VALUES AND ORIGINAL TREE TO GENERATE ARRAY OF GROUPS BY HEIGHT
    const output = [];
    Object.keys(memo).forEach(key => output[Number(key)] = memo[key]);

    return output;
  }

  // HELPER METHODS

  copyTree(root) {    // root is an optional argument only intended to be used recursively
    // the original call of copyTree will not have a root provided, so root will be a new BST
    root = root || new BST();
    
    // pre-order traversal with callback being an insert of this.value into the root (i.e. the new BST)
    if (!this.left && !this.right) {
      root.insert(this.value);
    } else if (!this.right) {
      root.insert(this.value);
      this.left.copyTree(root);
    } else if (!this.left) {
      root.insert(this.value);
      this.right.copyTree(root);
    } else {
      root.insert(this.value);
      this.left.copyTree(root);
      this.right.copyTree(root);
    }

    // the root (i.e. the new BST) will be returned
    return root;
  }

  getMemoOfNodeHeights(memo) {
    // initialize memo
    memo = memo || {};

    // figure out current node's height and save information to current node's height property
    if (!this.left && !this.right) {
      this.height = 0;
    } else if (!this.right) {
      this.left.getMemoOfNodeHeights(memo);
      this.height = this.left.height + 1;
    } else if (!this.left) {
      this.right.getMemoOfNodeHeights(memo);
      this.height = this.right.height + 1;
    } else {
      this.left.getMemoOfNodeHeights(memo);
      this.right.getMemoOfNodeHeights(memo);
      this.height = Math.max(this.left.height, this.right.height) + 1;
    }

    // add current node's value to the appropriate height bucket in the memo
    memo[this.height] = memo[this.height] || [];
    memo[this.height].push(this.value);

    // ultimately, return the memo
    return memo;
  }

}

// TEST CASES

const equals = require('./_equality-checker');
let testNum = 1;
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
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;

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
console.log(
  equals(output, expected)
    ? `TEST ${testNum} PASSED`
    : `TEST ${testNum} FAILED: EXPECTED ${expected} BUT GOT ${output}`
);
testNum++;