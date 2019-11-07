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

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.

class BinaryTree {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }

  // SWITCHING BETWEEN SOLUTIONS:
  findPathToTarget (target) { return this.solution_1(target); }

  solution_1 (target, path = []) {
    path.push(this.value)
    if (this.value === target) return path;
    if (this.left) {
      const leftPath = this.left.solution_1(target, path)
      if (leftPath.length > 0) return leftPath;
    }
    if (this.right) {
      const rightPath = this.right.solution_1(target, path)
      if (rightPath.length > 0) return rightPath;
    }
    path.pop()
    return [];
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
const func = (new BinaryTree).findPathToTarget;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'A',
};
expected = ['A'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'G',
};
expected = ['A', 'C', 'G'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'Z',
};
expected = [];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);