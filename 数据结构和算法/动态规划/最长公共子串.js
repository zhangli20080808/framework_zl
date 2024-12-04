// 定义状态：
// dp[i][j] 表示 s1 的前 i 个字符和 s2 的前 j 个字符的最长公共子串的长度。
// 状态转移方程：
// 如果 s1[i-1] == s2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1。
// 否则，dp[i][j] = 0。
// 初始化：
// dp[0][j] = 0 和 dp[i][0] = 0，因为任何字符串与空字符串的最长公共子串长度为 0。
// 记录最长公共子串：
// 在填充 dp 数组的过程中，记录最长公共子串的结束位置和长度。
// 构造最长公共子串：
// 根据记录的结束位置和长度，从 s1 或 s2 中提取最长公共子串。
function longestCommonSubstring(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let maxLength = 0;
  let endIndex = -1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i - 1; // 记录最长公共子串的结束位置
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  if (maxLength === 0) {
    return '';
  }

  // 构造最长公共子串
  return s1.substring(endIndex - maxLength + 1, endIndex + 1);
}

// 测试用例
const s1 = 'ABABC';
const s2 = 'BABCA';
console.log(longestCommonSubstring(s1, s2)); // 输出: "BABC"
