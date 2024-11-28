/**
 * 思路
初始化两个指针：一个指针 left 从数组的左端开始，另一个指针 right 从数组的右端开始
初始化两个变量：leftMax 和 rightMax 分别记录从左到右和从右到左的最大高度。
遍历数组：
  如果 height[left] 小于 height[right]，则处理 left 指针：
  如果 height[left] 小于 leftMax，则可以接住 leftMax - height[left] 单位的雨水。
  否则，更新 leftMax。
  否则，处理 right 指针：
  如果 height[right] 小于 rightMax，则可以接住 rightMax - height[right] 单位的雨水。
  否则，更新 rightMax。
移动指针：根据条件移动 left 或 right 指针，直到它们相遇。

 * @param {*} height 
 */
function trap(height) {
  if (height.length === 0) return 0;

  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}
// 动态规范法
// 预处理：创建两个数组 leftMax 和 rightMax，分别记录每个位置从左到右和从右到左的最大高度。
// 计算雨水量：遍历数组，对于每个位置，计算可以接住的雨水量。
function trap(height) {
  if (height.length === 0) return 0;

  const n = height.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  // 预处理 leftMax
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 预处理 rightMax
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 计算雨水量
  let water = 0;
  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return water;
}

// 初始化 leftMax：
// leftMax[0] = height[0]，因为从位置 0 到位置 0 的最大高度就是 height[0]。

// 填充 leftMax：
// 对于每个位置 i，leftMax[i] = Math.max(leftMax[i - 1], height[i])。
// 这里使用 i-1 是因为在填充 leftMax[i] 时，leftMax[i-1] 已经包含了从位置 0 到位置 i-1 的最大高度信息。

// 填充 rightMax：
// 对于每个位置 i，rightMax[i] = Math.max(rightMax[i + 1], height[i])。
// 这里使用 i+1 是因为在填充 rightMax[i] 时，rightMax[i+1] 已经包含了从位置 i+1 到位置 n-1 的最大高度信息。

// 对于每个位置 i，计算可以接住的雨水量 Math.min(leftMax[i], rightMax[i]) - height[i]。
const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height)); // 输出：6
