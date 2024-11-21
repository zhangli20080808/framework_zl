// 题目要求判断一个单链表是否为回文链表。为了实现这个功能，我们可以使用快慢指针找到链表的中间节点，然后反转后半部分链表，最后比较前半部分和反转后的后半部分是否相同。

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function middleNode(head) {
  if (!head) return;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = head.next;
    fast = head.next.next;
  }
  return slow;
}
// 创建链表  arr = [1,2,3,4,5]
// function createLinkedList(arr) {
//   let dummy = new ListNode();
//   let current = dummy;
//   for (const num in arr) {
//     current.next = new ListNode(num);
//     current = current.next;
//   }
//   return dummy.next;
// }

// 使用快慢指针 找到链表的中间节点
//
function isPali(head) {
  if (!head || !head.next) return;
  // 使用快慢指针 找到链表的中间节点
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = head.next; // 走一步
    fast = head.next.next; // 走两步
  }
  // 在使用快慢指针找到链表的中间节点后，
  // 我们需要反转链表的后半部分以便于比较前半部分和后半部分是否相同
  // 操作 slow  此时已经在中间了
  // prev 指针在这里扮演着关键角色，用于帮助我们反转链表的后半部分
  // 翻转过程
  let prev = null;
  while (slow) {
    const nextNode = slow.next; // 保存下一个节点
    slow.next = prev; // 当前节点的 next 指向前一个节点
    prev = slow; // 更新 prev 为当前节点
    slow = nextNode; // 移动到下一个节点
  }
  
}
