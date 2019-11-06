function equals (actual, expected) {

  // IF actual OR expected IS EITHER undefined OR null THEN DIRECTLY COMPARE (AS THOSE DON'T HAVE CONSTRUCTORS)
  if (
    actual === undefined
    || expected === undefined
    || actual === null
    || expected === null
  ) return actual === expected;

  // CHECK CONSTRUCTORS. IF actual AND expected DO NOT HAVE THE SAME CONSTRUCTOR, RETURN FALSE
  if (actual.constructor !== expected.constructor) return false;

  // NOW THE TEST VARIES DEPENDING ON THE CONSTRUCTOR...
  switch (actual.constructor) {
    case Array:                                               // ARRAYS: (1) check lengths, (2) recurse on elements
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!equals(actual[i], expected[i])) return false;
      }
      return true;
    case Object:                                              // OBJECTS: (1) recurse on sorted keys, (2) compare values by key
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      if (!equals(actualKeys, expectedKeys)) return false;
      for (let i = 0; i < actualKeys.length; i++) {
        if (!equals(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
      }
      return true;
    case Set:                                                 // SETS: (1) spread into array and sort, (2) recurse on sorted arrays
      return equals([...actual].sort(), [...expected].sort());
    case String:                                              // STRINGS: direct comparison
      return actual === expected;
    default:                                                  // NUMBERS (default): (1) check whether actual and expected are both NaN, (2) direct comparison
      return (isNaN(actual) && isNaN(expected))
        ? true
        : actual === expected;
  }
}

module.exports = equals;

// // numbers
// console.log('NUMBERS:');
// console.log('TRUE?', equals(1, 1));
// console.log('FALSE?', equals(0, 1));
// console.log('');

// // strings
// console.log('STRING:');
// console.log('TRUE?', equals('abc', 'abc'));
// console.log('FALSE?', equals('abc', 'abcd'));
// console.log('');

// // arrays
// console.log('ARRAYS:');
// console.log('TRUE?', equals([], []));
// console.log('FALSE?', equals([], [1]));
// console.log('TRUE?', equals([1, 2, 3], [1, 2, 3]));
// console.log('FALSE?', equals([1, 2, 3], [3, 2, 1]));
// console.log('');

// // object literals
// console.log('OBJECT LITERALS:');
// console.log('TRUE?', equals({}, {}));
// console.log('FALSE?', equals({}, {'a': 1}));
// console.log('TRUE?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3}));
// console.log('FALSE?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6}));
// console.log('FALSE?', equals({'a': 1, 'b': 2, 'c': 3}, {'d': 1, 'e': 2, 'f': 3}));
// console.log('TRUE?', equals({'a': 1, 'b': 2, 'c': 3}, {'c': 3, 'b': 2, 'a': 1}));
// console.log('FALSE?', equals({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3, 'd': 4}));
// console.log('');

// // nested objects
// console.log('NESTED OBJECTS:');
// console.log('TRUE?', equals([{'a': 1, 'b': 2, 'c': 3}, [], {'d': 4, 'e': {'f': 6, 'g': 7}}], [{'c': 3, 'b': 2, 'a': 1}, [], {'e': {'g': 7, 'f': 6}, 'd': 4}]));
// console.log('');

// // NaN - if actual and expected are both NaN, it should return true
// console.log('NaN:');
// console.log('TRUE?', equals(NaN, NaN));
// console.log('FALSE?', equals(1, NaN));
// console.log('FALSE?', equals(NaN, 1));
// console.log('TRUE?', equals(1 * 'asdf', 2 * 'asdf'));
// console.log('');

// // null
// console.log('NULL:');
// console.log('TRUE?', equals(null, null));
// console.log('FALSE?', equals(1, null));
// console.log('FALSE?', equals(null, 1));
// console.log('FALSE?', equals(null, undefined));
// console.log('FALSE?', equals(null, NaN));
// console.log('FALSE?', equals(NaN, null));
// console.log('');

// // undefined
// console.log('UNDEFINED:');
// console.log('TRUE?', equals(undefined, undefined));
// console.log('FALSE?', equals(1, undefined));
// console.log('FALSE?', equals(undefined, 1));
// console.log('FALSE?', equals(undefined, null));
// console.log('FALSE?', equals(undefined, NaN));
// console.log('FALSE?', equals(NaN, undefined));
// console.log('');

// // sets
// console.log('SETS:');
// console.log('TRUE?', equals(new Set(), new Set()));
// console.log('FALSE?', equals(new Set([1]), new Set()));
// console.log('TRUE?', equals(new Set([1, 2, 3]), new Set([3, 2, 1])));
// console.log('FALSE?', equals(new Set([[1], 2, 3]), new Set([[3], 2, 1])));
// console.log('TRUE?', equals(new Set(new Set([1, 2, 3])), new Set([3, 2, 1])));
// console.log('TRUE?', equals(new Set(new Set([1, 2, 3, 2, 1, 2, 3, 2, 1])), new Set([3, 2, 1])));
// console.log('');