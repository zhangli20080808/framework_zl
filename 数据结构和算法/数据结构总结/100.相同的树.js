/**
 * 1. 比较 两个树的value 2. 比较左子树 3. 比较右子树
 * @param {*} p
 * @param {*} q
 */
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    q.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(q.right, q.right)
  ) {
    return true;
  }
  return false;
}
