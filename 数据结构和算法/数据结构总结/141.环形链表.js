/**
https://leetcode.cn/problems/linked-list-cycle/description/
 * 普通思路 - 遍历的时候存储起来，再次遍历发现有 就返回 true
 * @param {*} head
 */
var Cycle = (head) => {
  //
  // let cache = new Set();
  // while (head) {
  //   if (cache.has(head)) {
  //     return true;
  //   } else {
  //     cache.add(head);
  //   }
  //   head = head.next;
  // }
  // return false;
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    // 能到终点一定是fast先到
    fast = fast.next.next; // fast 每次跳两个节点
    slow = slow.next; // slow 每次跳一个节点
    if (fast === slow) return true;
  }
  return false;
};

/**
 * 1. 慢的走一拍 p1 = p1.next
   2. 快的走两牌 p2 = p2.next.next
   步数设置为1和2有两倍的关系，这样不仅是快慢指针，在某些题目中还能用于求链表的中间节点。
 * @param {*} head 
 */
function hasCycle(head) {
  let p1 = head;
  let p2 = head;
  while (p1 && p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }
  if (p1 === p2) return true;
  return false;
}

/**
 * 1. 知识点 - 如果 A 沿着原型联能够找到 B.prototype，那么 A instanceof beforeCreate() {
   2. 遍历 A 的原型链，如果找到 B.prototype, 那么返回 ture，否则 false
 },
 * @param {*} A 
 * @param {*} B 
 */
function instanceofTest(A, B) {
  // 首先设置一个指针，遍历原型链，和遍历 链表一样
  let p = A;
  // 只恨有值的情况下，不断验证A 的原型链向上, 原型链工作完成
  while (p) {
    // 找到B的原型对象就返回 true
    if (p === B.prototype) return true;
    p = p.__proto__;
  }
  return false;
}
