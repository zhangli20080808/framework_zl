// 输入一个字符串，打印出该字符串中，所有字符的排列组合

/**
 *
 * @param {*} str - 接受一个字符串str作为输入，并返回该字符串所有字符的排列组合
 * @param {*} memo  - 数组用于跟踪当前排列中已经包含的字符
 * @param {*} result 用于存储所有找到的排列
 */
function permute(str, memo = [], result = []) {
  // 如果memo的长度等于str的长度，说明找到了一个完整的排列，将其添加到结果数组中
  if (memo.length === str.length) {
    result.push(memo.join(''));
    return;
  } // 遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 如果当前字符已经在memo中，则跳过以避免重复
    if (memo.includes(str[i])) continue; // 将当前字符添加到memo中，并递归调用permute函数继续处理剩余字符
    memo.push(str[i]);
    permute(str, memo, result); // 回溯，将当前字符从memo中移除，以便尝试其他排列
    memo.pop();
  }
  return result;
}
// 示例用法
const inputString = 'abc';
const permutations = permute(inputString);

// 打印所有排列组合
permutations.forEach((permutation) => {
  console.log(permutation);
});
