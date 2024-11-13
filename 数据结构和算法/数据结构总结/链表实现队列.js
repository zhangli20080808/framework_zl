/**
   单向链表，但是 要同事记录 head 和 tail
   A->B->C->D->E
   比如新增f， 让 E.next = F, tail =  F ,后续同理
   A 出队，删掉 A.next，head 指向 B 就ok了
 * 1. 实现 add 方法
   2. 实现 delete 方法
   3. 实现 length 方法
 */
class MyQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }
  /**
   * 入队, 在 tail 的位置
   * @param {*} n
   */
  add(n) {
    const newNode = {
      value: n,
      next: null,
    };
    // 处理 head 节点，判断链表是否为空
    if (this.head == null) {
      this.head = newNode;
    }
    this.len++;
    // 处理 tail
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;
  }
  /**
   * 出队， 在head的位置
   */
  delete() {
    const headNode = this.head;
    if (headNode == null) return null;
    if (this.length === 0) return null;

    // 取值
    const headValue = headNode.value;
    // 处理头部，让头结点指向下一个节点
    this.head = headNode.next;
    // 处理 length
    this.len--;
    console.log(headValue);
    return headValue;
  }
  get length() {
    return this.len;
  }
}
// 功能测试
const q = new MyQueue();
q.add(100);
q.add(200);
q.add(300);
console.info('length1', q.length);
console.log(q.delete());
console.info('length2', q.length);
console.log(q.delete());
console.info('length3', q.length);
console.log(q.delete());
console.info('length4', q.length);
console.log(q.delete());
console.info('length5', q.length);

// 性能测试
const q1 = new MyQueue();
console.time('queue with list');
for (let i = 0; i < 10 * 10000; i++) {
  q1.add(i);
}
for (let i = 0; i < 10 * 10000; i++) {
  q1.delete();
}
console.timeEnd('queue with list'); // 17ms

const q2 = [];
console.time('queue with array');
for (let i = 0; i < 10 * 10000; i++) {
  q2.push(i); // 入队
}
for (let i = 0; i < 10 * 10000; i++) {
  q2.shift(); // 出队
}
console.timeEnd('queue with array'); // 431ms
