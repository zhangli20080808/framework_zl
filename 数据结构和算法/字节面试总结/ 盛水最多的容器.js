// 可以使用双指针（Two Pointers）的方法来解决这个问题。具体步骤如下：

// 初始化指针：
// 使用两个指针 left 和 right，分别指向数组的起始位置和结束位置。
// 初始化最大容量 maxArea 为 0。
// 移动指针：
// 计算当前两个指针之间的面积，公式为 area = min(height[left], height[right]) * (right - left)。
// 更新 maxArea 为当前面积和 maxArea 的较大值。
// 移动较短的那根柱子的指针，以期望找到更高的柱子，从而增加容器的容量。
// 终止条件：
// 当 left 和 right 指针相遇时，停止循环。
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    const area = h * w;

    maxArea = Math.max(maxArea, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}
// 初始化变量：
// left：左指针，初始值为 0。
// right：右指针，初始值为 height.length - 1。
// maxArea：记录最大容量，初始值为 0。
// 移动指针：
// 使用 while 循环，条件为 left < right。
// 计算当前两个指针之间的高度 h，取 height[left] 和 height[right] 的较小值。
// 计算当前两个指针之间的宽度 w，即 right - left。
// 计算当前面积 area，公式为 h * w。
// 更新 maxArea 为当前面积和 maxArea 的较大值。
// 如果 height[left] 小于 height[right]，则移动左指针 left；否则，移动右指针 right。
// 返回结果：
// maxArea 即为能接住最多雨水的容器的最大容量。
