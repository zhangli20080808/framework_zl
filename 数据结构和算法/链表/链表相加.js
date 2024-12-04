function addInList(head1, head2) {
  // write code here
  let dummy = new ListNode(0); // 虚拟头节点
  let current = dummy;
  let carry = 0; // 进位

  while (head1 || head2 || carry) {
    const val1 = head1 ? head1.val : 0;
    const val2 = head2 ? head2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10); // 计算进位
    const digit = sum % 10; // 当前位的值

    current.next = new ListNode(digit); // 创建新节点并连接到结果链表
    current = current.next; // 移动指针

    if (head1) head1 = head1.next;
    if (head2) head2 = head2.next;
  }

  return dummy.next; // 返回结果链表的头节点
}
