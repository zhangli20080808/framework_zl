// 可以使用动态规划（Dynamic Programming, DP）来解决这个问题。具体步骤如下：

// 定义状态：
// dp[i][j] 表示从起点 (0, 0) 到达位置 (i, j) 的不同路径数目。
// 状态转移方程：
// dp[i][j] = dp[i-1][j] + dp[i][j-1]，表示到达位置 (i, j) 的路径数是从上方 (i-1, j) 或左侧 (i, j-1) 到达的路径数之和。
// 初始化：
// dp[0][0] = 1，表示起点有一个路径。
// 第一行和第一列的所有位置都只能有一种路径到达，即从起点一直向右或一直向下。
// 结果：
// dp[m-1][n-1] 即为从起点到终点的不同路径数目。
function uniquePaths(m, n) {
  // 初始化 dp 数组
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // 初始化第一行和第一列
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  // 填充 dp 数组
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  // 返回结果
  return dp[m - 1][n - 1];
}
