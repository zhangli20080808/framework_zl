function permute(s) {
  const result = [];
  const path = [];
  const used = new Array(s.length).fill(false);

  function backtrack() {
    if (path.length === s.length) {
      result.push(path.join(''));
      return;
    }

    for (let i = 0; i < s.length; i++) {
      if (used[i]) continue; // 跳过已经使用过的字符

      path.push(s[i]);
      used[i] = true;

      backtrack();

      path.pop(); // 回溯
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// 测试用例
const s = 'abc';
console.log(permute(s)); // 输出: ["abc", "acb", "bac", "bca", "cab", "cba"]
