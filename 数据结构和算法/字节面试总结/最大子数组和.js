/**
初始化：
maxSoFar 初始化为数组的第一个元素 nums[0]。
maxEndingHere 也初始化为数组的第一个元素 nums[0]。
遍历数组：
从数组的第二个元素开始遍历，即从索引 1 开始。
对于每个元素 nums[i]：
更新 maxEndingHere：maxEndingHere 可以是当前元素 nums[i] 本身，或者当前元素加上之前的 maxEndingHere。选择这两者中较大的一个。
更新 maxSoFar：如果 maxEndingHere 大于 maxSoFar，则更新 maxSoFar 为 maxEndingHere。
返回结果：
遍历完成后，maxSoFar 就是最大子数组和。
 */
function maxSubArray(nums) {
  if (nums.length === 0) {
    return 0; // 如果数组为空，返回0
  }

  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 更新以当前元素结尾的最大子数组和
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

    // 更新全局最大子数组和
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// 示例
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums)); // 输出：6
