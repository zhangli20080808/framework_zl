/**
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

输入: ["flower","flow","flight"]
输出: "fl"
输入: ["dog","racecar","car"]
输出: ""
 */
let longestCommonPrefix = function (strs) {
  // 1. 判断空数组情况，直接将第一位元素作为参照物
  // 2. 这里遍历是从1开始，因为第一位被我们拿来当参照物了
  // 3. 这里的正则加了^，表示从字符开始位置开始匹配
  // 4. 比较其它字符看是否符合，若不符合让正则条件的字符递减==
  let re = strs[0] ? strs[0] : '';
  // for (let i = 1; i < strs.length; i++) {
  //   let regex = new RegExp(`^${re}`);
  //   while (!regex.test(re) && re.length) {
  //     // 这里控制了字符递减
  //     re = re.slice(0, strs.length - 1);
  //     // 递减后重新声明正则
  //     regex = new RegExp(`^${re}`);
  //   }
  // }
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(re) !== 0) {
      re = re.substring(0, re.length - 1);
      if (re === '') return '';
    }
  }
  return re;
};
const arr = ['abca', 'abc', 'abca', 'abc', 'abcc'];
console.log(longestCommonPrefix(arr));
