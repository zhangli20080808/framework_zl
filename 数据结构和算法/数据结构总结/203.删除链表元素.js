/**
 * 1. 一般都是用 head 来代表 链表的 头结点
思路1 - 递归，返回新的头结点
https://leetcode.cn/problems/remove-linked-list-elements/solutions/813358/yi-chu-lian-biao-yuan-su-by-leetcode-sol-654m/
考虑入口的边界条件
 * @param {*} head 
 * @param {*} val 
 */
var removeElement = (head, val) => {
  // if (head == null) {
  //   return head;
  // }
  // 下一个节点依然是调用删除节点去操作，递归 不停的删
  // head.next = removeElement(head.next, val);
  // return head.val === val ? head.next : head;

  // 由于head里面 我们的头结点需要不断的判断，我们有个小小的技巧
  // 设置一个哨兵饼元素 链表原本只想 1=》2=》3=》4
  // 让 1这个head节点 指代我们的所有链表
  let ele = {
    next: head,
  };
  let p = ele;
  while (p.next) {
    // 如果元素接节点一直有next
    if (p.next.val === val) {
      // 下一个节点的值 = val，发现这个节点，1直接指向3
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return ele.next;
};
