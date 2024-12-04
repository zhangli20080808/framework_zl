function lowestCommonAncestor(root, p, q) {
  if (root == null) return null;
  // 如果两个值都小于根节点，说明祖先在左子树一侧
  if (p < root.val && q < root.val)
    return lowestCommonAncestor(root.left, p, q);
  // 如果两个值都大于根节点，说明祖先在右子树一侧
  else if (p > root.val && q > root.val)
    return lowestCommonAncestor(root.right, p, q);
  //否则，在两个值中间，或者等于其中一个值
  else return root.val;
}
