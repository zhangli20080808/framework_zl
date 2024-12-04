/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *定义滑动窗口：
使用两个指针 left 和 right 来表示当前窗口的左右边界。
使用一个哈希表 map 来记录窗口内每个元素的出现次数。
扩展窗口：
移动 right 指针，将新元素加入窗口，并更新哈希表。
如果新元素在窗口中已经存在，则移动 left 指针，直到窗口中不再包含重复元素。
记录最大长度：
每次移动 right 指针时，更新最长无重复子数组的长度。
 * @param arr int整型一维数组 the array
 * @return int整型
 */
function maxLength(s) {
  // write code here
  const charCount = {}; // 用于记录字符出现次数的哈希表
  let left = 0; // 左指针
  let maxLength = 0; // 最长无重复子数组的长度

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果当前字符已经在哈希表中存在，移动左指针收缩窗口
    if (charCount[char] !== undefined) {
      // 移动左指针，直到窗口中不再有重复字符
      while (s[left] !== char) {
        delete charCount[s[left]];
        left++;
      }
      left++; // 移动左指针，跳过重复字符
    }

    // 记录当前字符
    charCount[char] = right;

    // 更新最长无重复子数组的长度
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
// const length = s.length;
// let arr = [],
//   max = 0;
// for (let i = 0; i < s.length; i++) {
//   let index = arr.indexOf(s[i]);
//   if (index !== -1) {
//     arr.splice(0, index + 1);
//   }
//   arr.push(s.charAt(i));
//   max = Math.max(arr.length, max);
// }
// return max;

function lengthOfLongestSubstring(nums) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < nums.length; right++) {
    if (map.has(nums[right])) {
      left = Math.max(map.get(nums[right]) + 1, left);
    }
    map.set(nums[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
