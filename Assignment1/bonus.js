/*

C. Part3: Bonus (2 Grades):
How to deliver the bonus?
1- Solve the problem Counter II on LeetCode
Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.

var createCounter = function(init) {
  let current = init;

  return {
    increment: function() {
      return ++current;
    },
    decrement: function() {
      return --current;
    },
    reset: function() {
      current = init;
      return current;
    }
  };
};


2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.js”
3- Copy the code that you have submitted on the website inside ”bonus.js” file
 */



