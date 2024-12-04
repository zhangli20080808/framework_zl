/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Convert(pRootOfTree) {
  // write code here
  let head = null;
  let p = null;
  function traversal(root) {
    if (root === null) return;
    traversal(root.left);
    if (root.left === null && head === null) {
      head = p = root;
    } else {
      p.right = root;
      root.left = p;
      p = root;
    }
    traversal(root.right);
  }
  traversal(pRootOfTree);
  return head;
}
