// 滑动窗口的最大值
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 使用一个双端队列（deque）来存储窗口内的元素索引。
遍历数组，维护一个单调递减的队列，确保队列头部始终是当前窗口的最大值。
在每次滑动窗口时，移除队列中不在当前窗口内的元素。
记录每个窗口的最大值。
 * @param num int整型一维数组 
 * @param size int整型 
 * @return int整型一维数组
 */
function maxInWindows(nums, k) {
  // write code here
  if (nums.length === 0 || k === 0) return [];

  const deque = []; // 双端队列，存储索引
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // 移除不在当前窗口内的元素
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // 维护一个单调递减的队列
    while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }

    // 将当前元素的索引加入队列
    deque.push(i);

    // 记录当前窗口的最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
