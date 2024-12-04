function infixToPostfix(expression) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const output = [];
  const stack = [];

  for (let token of expression.split(' ')) {
    if (!isNaN(Number(token))) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop(); // 弹出 '('
    } else {
      while (
        stack.length > 0 &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(expression) {
  const stack = [];

  for (let token of expression) {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(Math.floor(a / b)); // 整数除法
          break;
      }
    }
  }

  return stack.pop();
}
function calculate(expression) {
  const postfix = infixToPostfix(expression);
  return evaluatePostfix(postfix);
}
