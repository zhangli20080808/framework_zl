function longestCommonPrefix(strs) {
  // write code here
  if (strs.length === 0) return '';

  // 初始化最长公共前缀为第一个字符串
  let prefix = strs[0];

  // 遍历数组中的每一个字符串
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      // 缩短前缀直到匹配
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }

  return prefix;
}
