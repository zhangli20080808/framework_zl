/**
 * 题目 - 两数之和 - 给定一个数组 nums 和 一个目标值 target，在该数组中找出和为目标值的两个数

 * @param {*} nums 
 * @param {*} target 
思路  
1. 创建一个空对象来 存储数组中的数字以及索引
2. 计算循环当前数值的 补数 比如，当前 1  ， 目标 11，补数为 10
3. 拿到补数，再对象中去寻找，如果存在，直接返回，不存在，记录当前数值和索引
备忘录改造
 */
// function twoSum(nums, target) {
//   // 创建一个空对象来存储数组中的数字及其索引
//   const numMap = {}; // 遍历数组
//   for (let i = 0; i < nums.length; i++) {
//     const num = nums[i];
//     const complement = target - num; // 计算补数 // 检查补数是否已经在哈希表中
//     if (complement in numMap) {
//       // 如果在，返回结果
//       return [numMap[complement], i];
//     } // 如果不在，将当前数字及其索引添加到哈希表中
//     numMap[num] = i;
//   } // 如果没有找到符合条件的两个数，抛出一个错误
//   throw new Error('No two sum solution');
// }
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    // 当前数的余数
    const rest = target - cur;
    if (map.has(rest)) {
      return [map.get(rest), i];
    } else {
      map.set(cur, i);
    }
  }
  return -1;
}

// 示例
const nums = [2, 7, 11, 15];
const target = 9;
try {
  const result = twoSum(nums, target);
  console.log(result); // 输出: [0, 1]
} catch (error) {
  console.error(error.message);
}
