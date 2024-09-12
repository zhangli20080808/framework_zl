/**
 * 基础数据结构
数据结构的增删改查
arr[0] arr[1] - 随机访问 O（1）
[1,2,4,5,6,3] - 新增元素的复杂度 是 O（n）


链表
1=>2=>3=>4  - 随机访问的时间复杂度 o(n)
对于删除 和 插入元素 时间复杂度 都是 o（1）




 * 线性结构 - 数组存储是一条线的  数组 队列 栈 链表
 * 队列 -> 先进先出  如果使用数组实现队列 [].push [].unshift 性能很差，现在基本都是用链表
 * 栈 -> 先进后出 [].push [].pop
 *
 * 栈的常见场景 浏览器历史 前进后退 两个栈 在放入之前会将另一个栈清空，没有前进了
 *
 * 如何使用栈来实现标签是否闭合
 *
 * 链表的概念
 * 1. 单向链表
 * 2. 单向循环链表
 * 3. 双向链表
 * 4. 双向循环链表
 * 5. 环形链表
 */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkNodeList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  append(val) {
    let node = new Node(val);
    let p = this.head; // 之所以把head缓存起来，作为一个指向，是因为后面可能会用到 insert remove this.head 不能随意修改
    if (this.head) {
      // 找到链表最后一个节点，把这个节点的next属性赋值 给Node, 只要next有值，就持续下去
      //  只要next有值，就 赋值给 他自己
      //  直到p.next没有值，找到最后一个节点
      while (p.next) {
        p = p.next;
      }
      p.next = node;
    } else {
      // 如果没有head节点，证明链表是空的，把要创建的节点 赋值给 head
      this.head = node;
    }
    this.length++;
  }
  print() {
    let p = this.head;
    let ret = '';
    if (this.head) {
      do {
        ret += p.val + '=>';
        p = p.next;
      } while (p.next);
      console.log(ret);
      ret += p.val;
    } else {
      console.log('empty');
    }
  }
}

const p = new LinkNodeList();
p.append(1);
p.append(2);
p.append(3);
p.append(4);
p.print();
