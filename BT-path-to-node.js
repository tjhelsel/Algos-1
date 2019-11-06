// SOURCE: A friend tells me that this problem was asked by Simon Data.

// Given the root node of a binary tree and a target value, write a function that returns an array of the path that leads to the target value.

// For example:

//             A
//           /   \
//          B      C
//         / \    / \
//        D   E  F   G
//       /
//      H

// If target value is 'A', return ['A']
// If target value is 'H', return ['A', 'B', 'D', 'H']
// If target value is 'Z', return []

// NOTE: I developed the following CompleteTree and Batch classes for easy creation of binary trees with arbitrary values.

class CompleteTree {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new CompleteTree(left);
    if (right !== null) this.right = new CompleteTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }

  // SWITCHING BETWEEN SOLUTIONS:
  findPathToTarget (target) { return this.solution_1(target); }

  solution_1 (target) {

    // SOLUTION 1 [O(n) time (n is the number of nodes in the tree), O(d) space (d is the depth of the tree)]:
    // this solution uses DFS backtracking. we start with an initial output 'path' of []. we write a recursive 'go' function that returns a boolean whether a valid path exists, given
    // the current path described in output. if the current node does not exist, return false. otherwise, add the current node's value to the output path. if the current node's value
    // is the target, return true. otherwise, recurse on node.left and node.right. if either are those ultimately result in true, then return true (which 'bubbles up' the truthy
    // result). if, on the other hand, all of those fail, then we have reached a dead end, so we pop the current value from the output path and return false. since at every step we
    // direclty modify the output 'path' object, all we have to do is invoke go() at the start, and then we can ultimately simply return the output object.

    const output = [];

    const go = (node = this) => {   // if writing this out as a separate function, use "root" instead of "this"
      if (!node) return false;      // base case false: if no more nodes on this path
      output.push(node.value);      // try this path by pushing the current node into the path
      if (
        node.value === target       // base case true: if current node is your target
        || go(node.left)            // recursive case true: if continuing to your left ultimately finds the target
        || go(node.right)           // recursive case true: if continuing to your right ultimately finds the target
      ) return true;                // 'bubble up' the truthy value for recursion
      output.pop();                 // recursive case false: going any further would be a dead end, so pop out the current node from the path
      return false;                 // 'bubble up' the falsy value for recursion
    }

    go();                           // simply invoke to start the process. we don't care what it returns - we just want it to produce the necessary side effects on the output object
    return output;                  // after invoking go(), we just need to return the output object
  }

}

class Batch {
  constructor (root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert (lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(values[2 * i] || null, values[2 * i + 1] || null)));
      }
    }
    return lastInsert ? this.root : new Batch (this.root, nextBatch);
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new CompleteTree).findPathToTarget;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new CompleteTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'A',
};
expected = ['A'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new CompleteTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'H',
};
expected = ['A', 'B', 'D', 'H'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  root: new CompleteTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'Z',
};
expected = [];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);