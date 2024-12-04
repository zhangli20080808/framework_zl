/*function ListNode(x){
    this.val = x;
    this.next = null;
初始化两个指针 p1 和 p2，分别指向两个链表的头节点。
遍历两个链表：
如果 p1 到达链表末尾，则将其重置为 head2。
如果 p2 到达链表末尾，则将其重置为 head1。
继续遍历，直到两个指针相遇。
如果两个指针相遇，则该节点就是第一个公共结点；如果两个指针都到达链表末尾（即 null），则说明两个链表没有公共结点。
}*/
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  if (!pHead1 || !pHead2) return null;

  let p1 = pHead1;
  let p2 = pHead2;

  while (p1 !== p2) {
    p1 = p1 ? p1.next : pHead2;
    p2 = p2 ? p2.next : pHead1;
  }

  return p1; // 返回第一个公共结点，如果没有公共结点则返回 null
}
