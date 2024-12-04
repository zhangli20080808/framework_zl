class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseKGroup(head, k) {
  // 增加虚拟头节点
  const dummy = new ListNode(0);
  dummy.next = head;

  // 定义 prev 和 end 结点
  let prev = dummy;
  let end = dummy;

  while (end.next != null) {
    // 以 k 个结点为条件，分组子链表
    for (let i = 0; i < k && end != null; i++) {
      end = end.next;
    }

    // 不足 K 个时不处理
    if (end == null) {
      break;
    }

    // 处理子链表
    const start = prev.next;
    const next = end.next;
    end.next = null;

    // 翻转子链表
    prev.next = reverseList(start);

    // 将子链表前后串起来
    start.next = next;
    prev = start;
    end = prev;
  }

  return dummy.next;
}

// 辅助函数：翻转链表
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr != null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// 测试用例
const list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
const k = 3;
const result = reverseKGroup(list, k);

// 打印结果
let current = result;
while (current != null) {
  process.stdout.write(current.val + ' ');
  current = current.next;
}
// 输出: 3 2 1 4 5
