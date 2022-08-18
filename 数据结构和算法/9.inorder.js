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
  inOrder(root.right);
  console.log(root.val);
}
// console.log(inOrder(bs));
// 4
// 2
// 5
// 1
// 6
// 3
// 7

/**
后续
对根节点的左子树进行后续遍历
对根节点的右子树进行后续遍历
访问根节点
*/

function postOrder(root) {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}

console.log(postOrder(bs));
// 4
// 5
// 2
// 6
// 7
// 3
// 1
