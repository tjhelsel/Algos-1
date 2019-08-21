function equals (actual, expected) {
  if (actual.constructor === Array) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!equals(actual[i], expected[i])) return false;
    }
    return true;
  } else if (actual.constructor === Object) {
    const actualKeys = Object.keys(actual).sort();
    const expectedKeys = Object.keys(expected).sort();
    if (!equals(actualKeys, expectedKeys)) return false;
    for (let i = 0; i < actualKeys.length; i++) {
      if (!equals(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
    }
    return true;
  } else {
    return actual === expected;
  }
}

// // numbers
// console.log(equals(1, 1));  // true
// console.log(equals(0, 1));  // false

// // strings
// console.log(equals('abc', 'abc'));  // true
// console.log(equals('abc', 'abcd')); // false

// // arrays
// console.log(equals([1, 2, 3], [1, 2, 3]));  // true
// console.log(equals([1, 2, 3], [3, 2, 1]));  // false

// // objects
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3}));  // true
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6}));  // false
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'d': 1, 'e': 2, 'f': 3}));  // false
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'c': 3, 'b': 2, 'a': 1}));  // true
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3, 'd': 4}));  // false

// // nested objects
// console.log(equals([{'a': 1, 'b': 2, 'c': 3}, [], {'d': 4, 'e': {'f': 6, 'g': 7}}], [{'c': 3, 'b': 2, 'a': 1}, [], {'e': {'g': 7, 'f': 6}, 'd': 4}]));  // true

module.exports = equals;