/**
1."()" -> true
2. "()[]{}" -> true
3. "(]" -> false
思路1  使用栈  遇到将左括号推入栈中，遇到右括号，如果能和栈顶元素能组成一对 pop ，负责直接返回false
*/
function isValid(s) {
  // 如果是 奇数直接返回false
  if (s % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '{' || c === '(' || c === '[') {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === '(' && c === ')') ||
        (t === '{' && c === '}') ||
        (t === '[' && c === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

function isMatch(p, cur) {
  if (p === '(' && cur === ')') return true;
  if (p === '{' && cur === '}') return true;
  if (p === '[' && cur === ']') return true;
  return false;
}
/**
 * 1. '({[' 入栈
  2. 循环到右边 如果匹配到 出栈
 * @param {*} s 
 */
function isValid3(s) {
  let left = '({[';
  let right = ')}]';
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (left.includes(current)) {
      // 左括号，入栈
      stack.push(current); // ['(', '{', '[']
    } else if (right?.includes(current)) {
      // 有货号，判断栈顶部（stack最后一个元素） -是否出栈
      const top = stack[stack.length - 1];
      if (isMatch(top, current)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
let aString = '(){}[]'; // true
let aStringFalse = '(){}]['; // false
// console.log(isValid(aString), 'test');
// 优化
function isValid2(s) {
  if (s % 2 === 1) return false;
  const stack = [];
  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map.has(c)) {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (map.get(t) === c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
function isValid4(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const cur = str[i];
    if (cur === '(' || cur === '{' || cur === '[') {
      stack.push(cur);
    } else {
      const p = stack[stack.length - 1];
      if (
        (p === '(' && cur === ')') ||
        (p === '{' && cur === '}') ||
        (p === '[' && cur === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
console.log(isValid(aString), 'test');
console.log(isValid3(aString), 'isValid3');

/**
使用 Map 优化两数之和的处理
1. 新建字典
2. 循环nums里面的值，逐个来寻找，没有合适的就先存着，有就直接返回
内存可能有点问题  主要是Map存储值的大小
*/
// function toSum(nums, target) {
//   const map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     const n = nums[i];
//     const n2 = target - n;
//     if (map.has(n2)) {
//       return [map.get(n2), i];
//     } else {
//       // 没有
//       map.set(n, i);
//     }
//   }
// }
// console.log(toSum([2, 7, 1, 3, 11], 13), 'sum');
