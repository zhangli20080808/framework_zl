var stack1 = []; // 入栈stack1
var stack2 = []; // 出栈stack2
function push(node) {
  // 入栈时stack1存入元素
  stack1.push(node);
}
function pop() {
  // 如果stack2没有元素，则将stack1中元素pop出再push存入stack2
  if (!stack2.length) {
    while (stack1.length) {
      stack2.push(stack1.pop());
    }
  }
  // stack2弹出元素
  return stack2.pop();
}
