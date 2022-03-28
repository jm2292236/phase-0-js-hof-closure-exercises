// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    Nothing
function forEach(array, callback) {
    for (element of array) {
        callback(element);
    }
}

// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    A new array with the result of the callback function
function map(array, callback) {
    const newArray = [];
    for (element of array) {
        newArray.push(callback(element));
    }

    return newArray;
}

// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    A new array with only the elements when the result to the callback function is true
function filter(array, callback) {
    const newArray = [];
    for (element of array) {
        if (callback(element))
            newArray.push(element);
    }

    return newArray;
}

// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    True only if the result of the callback function on all of the array elements is true.
//    Otherwise, False.
function every(array, callback) {
    for (element of array) {
        if (!callback(element))
            return false;
    }

    return true;
}

// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    True if the result of the callback function is true on at least one element of the array.
//    Otherwise, False.
function some(array, callback) {
    for (element of array) {
        if (callback(element))
            return true;
    }

    return false;
}

// Execute the callback function on each element of the array
// Receives:
//    - array (elements to be processed)
//    - calback (function to execute on every element)
// Returns:
//    True only if the result of the callback function is true on the majority of the elements of the array.
//    Otherwise, False.
function majority(array, callback) {
    let trueCalls = 0;
    for (element of array) {
      if (callback(element))
          trueCalls++;
    }

    return (trueCalls > array.length / 2);
}

function once(callback) {
    let result;
    console.log('inside once: ' + callback);
    return function() {
        if (callback) {
            result = callback();
            callback = null;
        }
        console.log('result = ' + result);
        return result;
    }
}

const onlyOnce = once(() => {console.log("Only once"); return Math.random()*10});
console.log('\ncalling once');
onlyOnce();
console.log('calling once');
onlyOnce();
console.log('calling once');
onlyOnce();

function groupBy(array, callback) {
    let object = {};
    let groupBy = [];
    let key = '';
    let lastKey = Math.floor(array[0]);
    for (element of array) {
        key = callback(element);
        if (lastKey != key) {
            object[lastKey] = groupBy;
            lastKey = key;
            groupBy = [];
        }
        groupBy.push(element);
    }
    object[lastKey] = groupBy;

    return object;
}

console.log('\ngroup by result');
object = groupBy([4.2, 6.1, 6.3, 9.0, 9.1, 9.5, 10.10, 10.20], ((el) => Math.floor(el)));
console.log(object);

function arrayToObject(array, callback) {
  object = {};
  for (element of array) {
      object[element] = callback(element);
  }

  return object;
}

module.exports = { 
  forEach, 
  map, 
  filter, 
  every, 
  some, 
  majority,
  once,
  groupBy,
  arrayToObject,
};
