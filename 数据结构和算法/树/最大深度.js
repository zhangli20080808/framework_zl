function maxDepth(root) {
  // write code here
  if (!root) {
    return 0; // 如果节点为空，返回0
  }

  // 递归计算左右子树的深度
  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);

  // 返回左右子树中较大的深度值 + 1（当前节点的深度）
  return Math.max(leftDepth, rightDepth) + 1;
}
