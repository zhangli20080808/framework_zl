const a = { val: 'a' };
const b = { val: 'b' };
const c = { val: 'c' };
const d = { val: 'd' };

a.next = b;
b.next = c;
c.next = d;

// 访问链表中的每个值 - 遍历链表
let p = a;
while (p) {
  console.log(p.val);
  p = p.next;
}
// 插入 -> 插到c和d之前
const e = { val: 'e' };
c.next = e;
e.next = d;

// 删除 -> 改变指针就好 e被删除掉了
c.next = d;
