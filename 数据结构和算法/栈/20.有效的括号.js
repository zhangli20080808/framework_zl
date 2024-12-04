var isValid = function (s) {
  // 如果是奇数，直接返回
  if (s.length % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < s.length; i += 1) {
    const cur = s[i];
    if (cur === '(' || cur === '{' || cur === '[') {
      stack.push(cur);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === '(' && cur === ')') ||
        (t === '{' && cur === '}') ||
        (t === '[' && cur === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

/**
最长的有效（正确关闭和打开）括号子串的长度
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
输入：s = "()()"
输出：4
解释：最长有效括号子串是 "()()"
输入：s = ")()"
输出：2
解释：最长有效括号子串是 "()"

1. 初始化变量
stack 栈，用于存储括号索引
maxLen 最长有效括号子串的长度
start 括号索引的起始位置
思路
2. 遍历字符串
 如果当前是 (, 则将索引加入栈
 如果当前是 )，则从栈中弹出一个索引，并计算当前索引和弹出索引之间的长度，更新 maxLen
 如果栈为空，则将当前索引作为起始位置
 demo

 假设输入字符串 s = "(()())"，我们逐步解析：
 i = 0，s[0] = '('，stack = [0]
i = 1，s[1] = '('，stack = [0, 1]
i = 2，s[2] = ')'，stack = [0]，计算长度 2 - 0 = 2，maxLen = 2
i = 3，s[3] = '('，stack = [0, 3]
i = 4，s[4] = ')'，stack = [0]，计算长度 4 - 0 = 4，maxLen = 4
i = 5，s[5] = ')'，stack = []，计算长度 5 - (-1) = 6，maxLen = 6
*/
function longestValidParentheses(s) {
  const stack = [];
  const maxLength = 0;
  let start = -1;
  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    if (cur === '(') {
      stack.push(i);
    } else {
      if (stack.length > 0) {
        // 如果栈为空，更新 start 为当前索引的下一个位置。
        stack.pop();
        if (stack.length > 0) {
          //  如果栈仍不为空，当前有效括号子串的起始位置为栈顶元素的索引。
          maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
        } else {
          // 如果栈为空，当前有效括号子串的起始位置为 start。
          maxLength = Math.max(maxLength, i - start);
        }
      } else {
        start = i; // 如果栈为空，更新 start 为当前索引的下一个位置。
      }
    }
  }
}
const s1 = '(()';
console.log(longestValidParentheses(s1)); // 输出: 2

const s2 = ')()())';
console.log(longestValidParentheses(s2)); // 输出: 4

const s3 = '()()';
console.log(longestValidParentheses(s3)); // 输出: 4

const s4 = ')()';
console.log(longestValidParentheses(s4)); // 输出: 2
