/**
 * add delete
思路：
stack1 push 入栈 比如  【a,b,c】
把stack1中的元素给stack2，成 c,b,a，栈尾 pop，拿到 a
然后 将 stack2中的元素 返回给  stack1
stack2

 */
// class Queue {
//   constructor() {
//     this.stack1 = [];
//     this.stack2 = [];
//   }
//   add(p) {
//     this.stack1.push(p);
//   }
//   delete() {
//     let res;
//     const stack1 = this.stack1;
//     const stack2 = this.stack2;
//     while (stack1.length) {
//       const n = stack1.pop();
//       if (n !== null) {
//         stack2.push(n);
//       }
//     }
//     res = stack2.pop();
//     while (stack2.length) {
//       const s = stack2.pop();
//       if (s !== null) {
//         stack1.push(s);
//       }
//     }
//     // 返回元素
//     return res;
//   }
//   get length() {
//     return this.stack1.length;
//   }
// }
// 链表实现队列 头尾指针，add 方法 delete 方法
class MyQueue {
  constructor() {
    // 头尾指针，链表的长度
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /**
   * 1. 没头
   * 1. 有头
   * 1. 有头
   * @param {*} p
   */
  add(p) {
    // 构造结构，没头，如果有头，有尾如何处理
    const newHead = {
      value: p,
      next: null,
    };
    if (this.head == null) {
      this.head = newHead;
    }
    this.len++;
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newHead;
    }
    this.tail = newHead; // 尾部节点不存在，说明还有一个节点
  }
  // 出队 - 还是堆头部进行处理
  // 获取头部，让头部的 next 指向新的头部，返回 头部的val
  delete() {
    const headNode = this.head;
    if (headNode == null) return;
    if (this.length === 0) return;
    const headValue = headNode.value;
    this.head = headNode.next;
    this.len--;
    console.log(headValue);
    return headValue;
  }
  get length() {
    return this.len;
  }
}
const queue = new MyQueue();
queue.add(100);
queue.add(200);
queue.add(300);
console.info('[  ] >', queue.length);
queue.delete();
console.info('[  ] >', queue.length);
queue.delete();
console.info('[  ] >', queue.length);
