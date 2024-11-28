/**
 * 基本思路是 使用三个指针来跟踪 当前节点  前一个节点  下一个节点
  通过逐步遍历链表，逐步将当前节点的next指向前一个节点，知道遍历完链表
 * @param {*} root 
  1. 保存当前节点的下一个节点
  2. 将当前节点的next指向前一个节点
  3. 更新prev和cur
 */
function reverseLinkList(root) {
  let prev = null;
  let cur = root;
  while (cur) {
    const nextNode = cur.next;
    cur.next = prev;
    // 更新 prev 为当前节点
    prev = cur;
    cur = nextNode;
  }
  return prev; // 新的头结点
}
