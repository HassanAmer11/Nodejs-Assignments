var majorityElement = function (nums) {
  let count = 1;
  let number;
  for (let index = 0; index < nums.length; index++) {
    const frequent = nums.filter((el) => el == nums[index]).length;
    if (frequent > count) {
      count = frequent;
      number = nums[index];
    }
  }
  return number;
};

const numbers = [6, 2, 6, 4, 5, 6, 4, 6];

console.log({ number: majorityElement(numbers) });
