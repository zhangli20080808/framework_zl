function minCostClimbingStairs(cost) {
  /*
   *  dp数组记录每次爬到第i阶楼梯的最小花费
   *  dp[i] = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])
   *  dp[0] = 0  dp[1] = 0;
   *
   */
  let dp = [0, 0];
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[cost.length];
}
