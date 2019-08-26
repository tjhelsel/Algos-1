function equals (actual, expected) {

  if (
    actual === undefined
    || expected === undefined
    || actual === null
    || expected === null
  ) return actual === expected;

  if (actual.constructor !== expected.constructor) return false;

  switch (actual.constructor) {
    case Array:
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!equals(actual[i], expected[i])) return false;
      }
      return true;
    case Object:
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      if (!equals(actualKeys, expectedKeys)) return false;
      for (let i = 0; i < actualKeys.length; i++) {
        if (!equals(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
      }
      return true;
    case String:
      return actual === expected;
    default:
      return (isNaN(actual) && isNaN(expected))
        ? true
        : actual === expected;
  }
}

// // numbers
// console.log('NUMBERS:');
// console.log(equals(1, 1));  // true
// console.log(equals(0, 1));  // false

// // strings
// console.log('STRING:');
// console.log(equals('abc', 'abc'));  // true
// console.log(equals('abc', 'abcd')); // false

// // arrays
// console.log('ARRAYS:');
// console.log(equals([], []));  // true
// console.log(equals([], [1]));  // false
// console.log(equals([1, 2, 3], [1, 2, 3]));  // true
// console.log(equals([1, 2, 3], [3, 2, 1]));  // false

// // object literals
// console.log('OBJECT LITERALS:');
// console.log(equals({}, {}));  // true
// console.log(equals({}, {'a': 1}));  // false
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3}));  // true
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6}));  // false
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'d': 1, 'e': 2, 'f': 3}));  // false
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'c': 3, 'b': 2, 'a': 1}));  // true
// console.log(equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3, 'd': 4}));  // false

// // nested objects
// console.log('NESTED OBJECTS:');
// console.log(equals([{'a': 1, 'b': 2, 'c': 3}, [], {'d': 4, 'e': {'f': 6, 'g': 7}}], [{'c': 3, 'b': 2, 'a': 1}, [], {'e': {'g': 7, 'f': 6}, 'd': 4}]));  // true

// // NaN - if actual and expected are both NaN, it should return true
// console.log('NaN:');
// console.log(equals(NaN, NaN));  // true
// console.log(equals(1, NaN));    // false
// console.log(equals(NaN, 1));    // false
// console.log(equals(1 * 'asdf', 2 * 'asdf'));  // true

// // null
// console.log('NULL:');
// console.log(equals(null, null));      // true
// console.log(equals(1, null));         // false
// console.log(equals(null, 1));         // false
// console.log(equals(null, undefined)); // false
// console.log(equals(null, NaN));       // false
// console.log(equals(NaN, null));       // false

// // undefined
// console.log('UNDEFINED:');
// console.log(equals(undefined, undefined));  // true
// console.log(equals(1, undefined));          // false
// console.log(equals(undefined, 1));          // false
// console.log(equals(undefined, null));       // false
// console.log(equals(undefined, NaN));        // false
// console.log(equals(NaN, undefined));        // false

module.exports = equals;