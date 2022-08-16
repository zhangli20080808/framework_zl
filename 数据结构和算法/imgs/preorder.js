/**
二叉树
基础概念：树中的每个节点最多只能有两个子节点
在js中使用Object来模拟二叉树
const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};
1. 訪問根節點
2. 對根節點的 左 子樹進行先序遍歷
3. 對根節點的 右 子樹進行先序遍歷
*/
const bs = require('../data/binary');
const preorder = (root) => {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
};

console.log(preorder(bs));
// 1
// 2
// 4
// 5
// 3
// 6
// 7
