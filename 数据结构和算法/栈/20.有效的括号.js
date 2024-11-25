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
