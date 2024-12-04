function rotate(nums, k) {
  const n = nums.length;
  k = k % n; // 处理 k 大于 n 的情况

  for (let i = 0; i < k; i++) {
    const last = nums[n - 1];
    for (let j = n - 1; j > 0; j--) {
      nums[j] = nums[j - 1];
    }
    nums[0] = last;
  }
}
// 处理 k 大于 n 的情况，取 k % n。
// 进行 k 次循环，每次将最后一个元素移到第一个位置，其他元素依次向后移动一位。

// 法转
function reverse(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}

function rotate(nums, k) {
  const n = nums.length;
  k = k % n; // 处理 k 大于 n 的情况

  reverse(nums, 0, n - 1); // 反转整个数组
  reverse(nums, 0, k - 1); // 反转前 k 个元素
  reverse(nums, k, n - 1); // 反转剩余的元素
}
// 定义一个 reverse 函数，用于反转数组的一部分。
// 反转整个数组。
// 反转前 k 个元素。
// 反转剩余的元素。
