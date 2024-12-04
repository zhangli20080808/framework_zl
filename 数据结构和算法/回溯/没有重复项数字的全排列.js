function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 跳过已经使用过的数字

      path.push(nums[i]);
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
const nums = [1, 2, 3];
console.log(permute(nums)); // 输出: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
