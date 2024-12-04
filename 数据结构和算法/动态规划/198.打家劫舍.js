// 输入：nums = [1, 2, 3, 1]
// 输出：4
// 解释：偷取第 1 个房屋（金额 = 1）和第 3 个房屋（金额 = 3），总金额 = 1 + 3 = 4。
// 输入：nums = [2, 7, 9, 3, 1]
// 输出：12
// 解释：偷取第 1 个房屋（金额 = 2）、第 3 个房屋（金额 = 9）和第 5 个房屋（金额 = 1），总金额 = 2 + 9 + 1 = 12。

// 定义状态：
// dp[i] 表示从第 0 个房屋到第 i 个房屋能偷取的最大金额。
// 状态转移方程：
// dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
// 解释：对于第 i 个房屋，有两种选择：
// 不偷第 i 个房屋，最大金额为 dp[i-1]。
// 偷第 i 个房屋，最大金额为 dp[i-2] + nums[i]。
// 初始化：
// dp[0] = nums[0]，表示只偷第一个房屋。
// dp[1] = Math.max(nums[0], nums[1])，表示偷前两个房屋中的最大金额。
// 结果：
// dp[n-1] 即为从所有房屋中偷取的最大金额。

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev1 = nums[0]; // dp[i-1]
  let prev2 = Math.max(nums[0], nums[1]); // dp[i-2]

  for (let i = 2; i < nums.length; i++) {
    let current = Math.max(prev2, prev1 + nums[i]);
    prev1 = prev2;
    prev2 = current;
  }

  return prev2;
}

// 示例用法
const nums = [1, 2, 3, 1];
const result = rob(nums);
console.log(result); // 输出: 4

// 定义状态 dp[i] 表示偷窃到第 i 个房屋时能够获得的最高金额。
// 状态转移方程：
// dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// 解释：要么不偷第 i 个房屋，最高金额为 dp[i-1]；要么偷第 i 个房屋，最高金额为 dp[i-2] + nums[i]。
// 初始条件：
// dp[0] = nums[0]
// dp[1] = max(nums[0], nums[1])
