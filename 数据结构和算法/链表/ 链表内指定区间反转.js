/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 *
 * @param head ListNode类
 * @param m int整型
 * @param n int整型
 * @return ListNode类
 */
function reverseBetween(head, m, n) {
  // write code here
  // 如果长度为一或 m 等 n，不需要翻转，直接返回head
  if (head.next === null || m === n) return head;
  let newHead = new ListNode(0);
  newHead.next = head;
  head = newHead;
  let prev = head;
  for (let i = 1; i < m; i++) {
    prev = prev.next;
  }
  // 到 m 的位置，开始循环翻转到 n (m = 2, n = 4)
  // 1 -> 2 -> 3 -> 4 -> 5
  //   pn   cn   cnn        (2 -> 4 cn = cnn) (3 -> 2 cnn = pn) (1 -> 3 pn = cn)
  // 1 -> 3 -> 2 -> 4 -> 5
  //   pn        cn   cnn   (2 -> 5 cn = cnn) (4 -> 3 cnn = pn) (1 -> 4 pn = cn)
  // 1 -> 4 -> 3 -> 2 -> 5
  // curr.next 在变，currnext 就在变，prev.next 在变, 但是 prev 并没有变
  let curr = prev.next;
  let currnext;
  for (let i = m; i < n; i++) {
    currnext = curr.next;
    curr.next = currnext.next;
    currnext.next = prev.next;
    prev.next = currnext;
    // 解构写法
    // [curr.next.next, curr.next, prev.next] = [prev.next, curr.next.next, curr.next]
  }
  return head.next;
}
