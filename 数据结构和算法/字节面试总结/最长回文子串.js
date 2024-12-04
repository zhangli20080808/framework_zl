/**
 *
 * @param {*} s
 * @returns
 */
function getLongestPalindrome(s) {
  const n = s.length;
  if (n === 0) return 0;

  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1; // 单个字符是回文
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}
