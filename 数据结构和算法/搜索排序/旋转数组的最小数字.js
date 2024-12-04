/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 
 初始化：设置两个指针 left 和 right，分别指向数组的起始和末尾。
二分查找：
计算中间位置 mid。
比较 nums[mid] 和 nums[right]：
如果 nums[mid] 小于 nums[right]，说明最小数字在左半部分，更新 right 为 mid。
如果 nums[mid] 大于 nums[right]，说明最小数字在右半部分，更新 left 为 mid + 1。
如果 nums[mid] 等于 nums[right]，无法确定最小数字的位置，缩小搜索范围，更新 right 为 right - 1。
返回结果：当 left 和 right 相遇时，left 指向的元素即为最小数字。

 * @param nums int整型一维数组
 * @return int整型
 */
// 二分查找法、分治
function minNumberInRotateArray(nums) {
  // write code here
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[right]) {
      right = mid;
    } else if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right -= 1; // 缩小搜索范围
    }
  }

  return nums[left];
}
