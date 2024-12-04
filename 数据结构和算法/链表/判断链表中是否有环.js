/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 *
 * @param head ListNode类
 * @return bool布尔型
 */
function hasCycle(head) {
  if (head === null || head.next === null) return false;

  let fast = head.next;
  let slow = head;

  while (fast && fast.next) {
    if (fast === slow) return true;
    fast = fast.next.next;
    slow = slow.next;
  }
  return false;
}
