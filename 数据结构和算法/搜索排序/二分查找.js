/**
 * js实现的二分查找, 找到目标值，返回其索引, 找不到返回 -1
1. 中间值 2. 向左向右查找
 */
function binarySearch1(arr = [], target) {
  const length = arr.length;
  if (length === 0) return;
  let startIndex = 0;
  let endIndex = arr.length - 1;
  while (startIndex <= endIndex) {
    // 找出中间值
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    const middleValue = arr[middleIndex];
    // 如果中间值 和 目标值 进行比较
    if (middleValue > target) {
      // 向左， endIndex bianle
      endIndex = middleIndex - 1;
    } else if (middleValue < target) {
      // 向右 startIndex 变了
      startIndex = middleIndex + 1;
    }
    return middleIndex;
  }
  return -1;
}
function search(nums = [], target) {
  // 在区间[left,right]中查找元素，左闭右闭
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    // 计算中间点
    //   let mid = parseInt(left + (right-left)/2);
    let mid = Math.floor((left + right) / 2);
    if (target == nums[mid]) {
      return mid;
      // 如果target < nums[mid]，表示目标值可能在左半边
    } else if (target < nums[mid]) {
      right = mid - 1;
      // 如果target > nums[mid]，表示目标值可能在右半边
    } else if (target > nums[mid]) {
      left = mid + 1;
    }
  }
  // 未找到返回-1
  return -1;
}
const arr = [10, 20, 30, 40, 50, 60];
const target = 20;
console.info(binarySearch1(arr, target));
