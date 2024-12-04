/**
  * 
  遍历链表，比较当前与下一个的值是否相等，如相等，把当前的下一个指向下一个的下一个。这里有两点要注意：1.要判断next以及next.next是否存在；2.只有值不相等遍历指针才往下走。
  */
function deleteDuplicates(head) {
  // write code here
  let current = head;
  while (current) {
    if (current.next && current.val == current.next.val) {
      if (current.next.next) {
        current.next = current.next.next;
      } else {
        current.next = null;
      }
    } else {
      current = current.next;
    }
  }
  return head;
}

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function deleteDuplicates(head) {
  // 增加虚拟头节点
  const dummy = new ListNode(0);
  dummy.next = head;

  // 定义 prev 结点
  let prev = dummy;

  while (prev.next != null && prev.next.next != null) {
    if (prev.next.val === prev.next.next.val) {
      // 找到所有连续相同的节点
      let curr = prev.next;
      let next = curr.next;
      while (next != null && curr.val === next.val) {
        next = next.next;
      }
      // 删除重复节点
      prev.next = next;
    } else {
      // 移动 prev 指针
      prev = prev.next;
    }
  }

  return dummy.next;
}

// 测试用例
const list = new ListNode(
  1,
  new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))
);
const result = deleteDuplicates(list);

// 打印结果
let current = result;
while (current != null) {
  process.stdout.write(current.val + ' ');
  current = current.next;
}
// 输出: 1 2 3
