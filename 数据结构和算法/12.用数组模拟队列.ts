/**
 * 1. 考察思路 - 对栈 api 的理解
 */
class MyQueue {
  private stack1: number[] = [];
  private stack2: any[] = [];

  add(p: number) {
    // 入队
    this.stack1.push(p);
  }

  delete() {
    // 出队
    let res;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    // 将stack1中的元素移动到stack2中
    while (stack1.length) {
      const p = stack1.pop();
      if (p !== null) {
        stack2.push(p);
      }
    }
    // 出队
    res = stack2.pop();
    // 将stack2中的元素还给 stack1
    while (stack2.length) {
      const p = stack2.pop();
      if (p !== null) {
        stack1.push(p);
      }
    }
    return;
  }
  get length() {
    return this.stack1.length;
  }
}

const queue = new MyQueue();
queue.add(1);
queue.add(2);
queue.add(3);
queue.delete();
console.log();
