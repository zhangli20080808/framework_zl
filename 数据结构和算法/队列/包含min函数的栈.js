class MinStack {
  constructor() {
    this.stack = []; // 主栈
    this.minStack = []; // 辅助栈
  }

  push(x) {
    this.stack.push(x);
    if (this.minStack.length === 0) {
      this.minStack.push(x);
    } else {
      const currentMin = this.minStack[this.minStack.length - 1];
      this.minStack.push(Math.min(x, currentMin));
    }
  }

  pop() {
    if (this.stack.length > 0) {
      this.minStack.pop();
      return this.stack.pop();
    }
    return null;
  }

  top() {
    if (this.stack.length > 0) {
      return this.stack[this.stack.length - 1];
    }
    return null;
  }

  getMin() {
    if (this.minStack.length > 0) {
      return this.minStack[this.minStack.length - 1];
    }
    return null;
  }
}

// 测试用例
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // 返回 -3
minStack.pop();
console.log(minStack.top()); // 返回 0
console.log(minStack.getMin()); // 返回 -2
