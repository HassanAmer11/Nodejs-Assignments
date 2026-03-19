//#region  A. Part 1: Coding Questions (7.5 Grade):

//1. Convert the string "123" to a number and add 7. (0.5 Grade)
let result = Number("123") + 7;
console.log(result); // 130

//2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
function checkFalsy(val) {
  return !val ? "Invalid" : "Valid";
}
console.log(checkFalsy(0)); // "Invalid"



//3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i);
}
// 1, 3, 5, 7, 9

//4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
let arr = [1, 2, 3, 4, 5];
let even = arr.filter((n) => n % 2 === 0);
console.log(even);


//5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
let a = [1, 2, 3];
let b = [4, 5, 6];

let merged = [...a, ...b];
console.log(merged);

//6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)
function getDay(num) {
  switch (num) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return "Invalid";
  }
}


//7. Create an array of strings and return their lengths using map method (0.5 Grade)

let words = ["a", "ab", "abc"];
let lengths = words.map((w) => w.length);
console.log(lengths); // [1,2,3]

//8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
function checkDivisibility(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "Divisible by both";
  } else {
    return "Not divisible by both";
  }
}
console.log(checkDivisibility(15)); // "Divisible by both"
//9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
const square = n => n * n;

console.log(square(5)); // 25

//10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
function formatPerson({ name, age }) {
  return `${name} is ${age} years old`;
}

const person = { name: "John", age: 25 };
console.log(formatPerson(person)); // "John is 25 years old"

//11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1,2,3,4,5)); // 15


//12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
function getPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Success");
    }, 3000);
  });
}

getPromise().then(msg => console.log(msg)); // Logs "Success" after 3 seconds


//13. Write a function to find the largest number in an array. (0.5 Grade)
function maxNum(arr) {
  return Math.max(...arr);
}

console.log(maxNum([1, 3, 7, 2, 4])); // 7

//14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
function getKeys(obj) {
  return Object.keys(obj);
}

console.log(getKeys({ name: "John", age: 30 })); // ["name", "age"]

//15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
function splitWords(str) {
  return str.split(" ");
}

console.log(splitWords("The quick brown fox")); // ["The", "quick", "brown", "fox"]

//#endregion

//#region B. Part 2: Essay Questions (2.5 Grade):

/*
1. What is the difference between forEach and for...of? When would you use each? (0.5 Grade)

forEach:
Array method.
Executes a callback for each element.
Cannot use break, continue, or return to stop the loop.
Works only on arrays.
[1, 2, 3].forEach(num => console.log(num));

for...of:

Loop statement.
Works with any iterable (arrays, strings, maps, etc.).
Supports break, continue, and return.

for (const num of [1, 2, 3]) {
  if (num === 2) break;
  console.log(num);
}

When to use:

Use forEach for simple iteration without control flow.

Use for...of when you need flexibility (break, async/await, etc.).
*/

/*

2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade)

Hoisting: JavaScript moves declarations to the top of their scope before execution.

console.log(a); // undefined
var a = 5;

TDZ (Temporal Dead Zone):  Applies to let and const => Variables exist but cannot be accessed before declaration.

console.log(a); // ReferenceError
let a = 5;

Key difference:
var → hoisted and initialized as undefined
let/const → hoisted but not initialized (TDZ)
*/

/*
3. What are the main differences between == and ===? (0.5 Grade)

== (loose equality):

Converts types before comparison (coercion).

'5' == 5 // true

=== (strict equality):

No type conversion.

Checks both value and type.

'5' === 5 // false

Best practice: Always use === to avoid unexpected results.
*/

/*
4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)
try → code that may throw an error

catch → handles the error

try {
  throw new Error("Oops");
} catch (err) {
  console.log(err.message);
}

With async/await:

Needed to catch errors from await.

async function fetchData() {
  try {
    const res = await fetch("url");
  } catch (err) {
    console.log("Error:", err);
  }
}

Why important:

Prevents app crashes.

Handles network/API failures gracefully.
*/

/*
5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade)
Type Conversion (explicit):

Manually converting types.
Number("123") // 123
String(123)   // "123"
Type Coercion (implicit):
JavaScript automatically converts types.
"5" - 1   // 4    (string → number)

Difference:
Conversion → intentional
Coercion → automatic
*/


//#region 
