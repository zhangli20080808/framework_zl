// 1. 找到左右子节点 2. 递归 ，3。返回
function inverseTree(root) {
  if (!root) {
    return null;
  }
  return {
    val: root.val,
    left: inverseTree(root.left),
    right: inverseTree(root.right),
  };
}
// var invertTree = function (root) {
//   if (root) {
//     const tmp = root.left;
//     root.left = root.right;
//     root.right = tmp;
//     invertTree(root.left);
//     invertTree(root.right);
//   }
//   return root;
// };
