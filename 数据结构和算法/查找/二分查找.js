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
    } else if (middleIndex > target) {
      // 向右 startIndex 变了
      startIndex = middleIndex + 1;
    }
    return middleIndex;
  }
  return -1;
}
const arr = [10, 20, 30, 40, 50, 60];
const target = 20;
console.info(binarySearch1(arr, target));
