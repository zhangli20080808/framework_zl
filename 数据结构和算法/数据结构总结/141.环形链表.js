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
