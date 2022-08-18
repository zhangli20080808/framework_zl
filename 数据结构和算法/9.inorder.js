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
console.log(inOrder(bs));
// 4
// 2
// 5
// 1
// 6
// 3
// 7
