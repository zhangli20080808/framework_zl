/**
 *
 * @param n int整型
 * @return string字符串一维数组
 */
function generateParenthesis(n) {
  // write code here
  let res = [];
  const dfs = (left, right, curStr) => {
    if (left == 0 && right == 0) {
      res.push(curStr);
      return;
    }
    if (left > 0) {
      dfs(left - 1, right, curStr + '(');
    }
    if (right > left) {
      dfs(left, right - 1, curStr + ')');
    }
  };
  dfs(n, n, '');
  return res;
}
