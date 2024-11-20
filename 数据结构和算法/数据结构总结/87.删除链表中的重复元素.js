/**
1. 当前元素的值和下个元素相等，删除下个元素
*/
function deleteDuplicates(head) {
  let p = head;
  // 为了保证p.next有值，我们多家判断
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    }
    // 继续遍历下去
    p = p.next;
  }
  return head;
}
