/**
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/21
 * @param {*} s 
 * @returns 
1. 先找出所有不包含重复字符 的子串
2. 找出长度最大的子串，返回长度 
 */
const lengthOfLongestSubstring2 = (s) => {
  let arr = [],
    max = 0;
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i]);
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(arr.length, max);
  }
  return max;
};

/**
 * 1. 用双指针维护一个滑动窗口，用来剪切子串 
   双指针 - 定义两个变量，记录子串的起始位置
   2. 不断移动右指针，遇到重复的字符，就把左指针移动到 之前重复字符的下一位
   3. 移动过程中，记录所有窗口的长度，并返回最大值
   abcabcbb
   ab-》abc （遇到重复字符）-》 bca-》cab -》 abc-》cb-》b
 */
const lengthOfLongestSubstring = (s) => {
  let l = 0;
  let res = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r += 1) {
    // 右指针递增
    const cur = s[r];
    // 如果map中存在，则说明是重复字符, 移动左指针, 重复字符必须在滑动区间内
    if (map.has(cur) && map.get(cur) >= l) {
      l = map.get(cur) + 1;
    }
    // 记录最大值, 滑动区间的值
    res = Math.max(res, r - l + 1);
    // 记录当前值和 索引下标
    map.set(cur, r);
  }
  return res;
};
const test = 'abcabcba'; // 4 错误
console.log(lengthOfLongestSubstring(test));
