/**
中序遍历
对根节点的左子树进行中序遍历
访问根节点
对根节点的右子树进行中遍历
*/
const bs = require('./data/binary');

function inOrder(root) {
  if (!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}
// console.log(inOrder(bs));
// 4
// 2
// 5
// 1
// 6
// 3
// 7
// 非递归版本
function inOrder2(root) {
  //左子树全部入栈，有点像链表
  const stack = [];
  const res = [];
  let p = root;

  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 所有的都推入之后，将最尽头的左子树弹出来
    const n = stack.pop();
    res.push(n.val);
    // 指针指向 右节点，进行全新的这一轮操作
    p = n.right;
  }
  return res;
}
// console.log(inOrder2(bs)); // 4,2,5,1,6,3,7

/**
后续
对根节点的左子树进行后续遍历
对根节点的右子树进行后续遍历
访问根节点
*/

// function postOrder(root) {
//   if (!root) return;
//   postOrder(root.left);
//   postOrder(root.right);
//   console.log(root.val);
// }

// console.log(postOrder(bs));
// 4
// 5
// 2
// 6
// 7
// 3
// 1
// 设一课二叉树的中序遍历序列：badce，
// 后序遍历序列：bdeca，则二叉树先序遍历序列为____。abdec

//   a
// b   d
//      c
//    e
// 非递归版本
// 1. 可以先变成 根 右 左 这样的类似 先序遍历的逻辑
// 2. 把访问操作改成入栈操作，再把子节点逆序输出过来访问
function postOrder2(root) {
  if (!root) return;
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const s = outputStack.pop();
    console.log(s.val);
  }
}
postOrder2(bs); // 4-5-2-6-7-3-1
