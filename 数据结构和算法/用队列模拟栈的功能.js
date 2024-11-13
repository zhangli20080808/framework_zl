// 要用队列实现栈的功能，可以使用两个队列来模拟栈的操作
// push(x):
// 将元素添加到 queue1。
// pop():
// 将 queue1 中的元素依次移到 queue2，直到只剩下一个元素。
// 弹出最后一个元素，即为栈顶元素。
// 交换 queue1 和 queue2，保持 queue1 为主要队列。
// top():
// 同样移除到只剩一个元素，但不弹出。
// 将元素放回 queue2 并交换队列。
// isEmpty():
// 判断 queue1 是否为空。

// 这种方法利用两个队列的特性，实现了栈的后进先出（LIFO）行为。
// 在实现栈的 pop 和 top 操作时，通过交换两个队列，可以确保后续的 push 操作继续在正确的队列中进行。

class Stack {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }
  push(x) {
    this.queue1.push(x);
  }
  // queue1 [1,2,3,4] -> queue2 []
  // 1  3
  // 2  2
  // 3  1
  // 4
  pop() {
    // 交换 queue1 和 queue2
    // 将 queue1 和 queue2 的引用互换。
    // 使得 queue1 始终为主要队列，保持栈的行为。
    // 减少两个队列交换的次数， 只有当queue1为空时，交换两个队列
    if (!this.queue1.length) {
      [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }
    return this.queue1.shift();
  }
  top() {
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }
    const poppedElement = this.queue1.shift();
    this.queue2.push(poppedElement);
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
    return topElement;
  }
  isEmpty() {
    return !this.queue1.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.top()); // 输出: 2
console.log(stack.pop()); // 输出: 2
console.log(stack.isEmpty()); // 输出: false

// 使用一个队列实现
/**
 * Initialize your data structure here.
 */
var MyStack = function () {
  this.queue = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.queue.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  let size = this.queue.length;
  while (size-- > 1) {
    this.queue.push(this.queue.shift());
  }
  return this.queue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  const x = this.pop();
  this.queue.push(x);
  return x;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.queue.length;
};
