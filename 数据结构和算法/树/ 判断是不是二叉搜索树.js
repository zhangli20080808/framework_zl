/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *如果当前节点的值小于左区间或者大于右区间，则返回 false。

否则，继续分别递归左右儿子节点：

递归左儿子，并将左儿子的右区间修改为父节点的值；

递归右儿子，并将右儿子的左区间修改为父节点的值。

最后，如果没有返回false，说明满足二叉搜索树，返回true。
 * @param root TreeNode类
 * @return bool布尔型
 */
function isValidBST(root) {
  // write code here
  let ans = [];
  function inOrder(root) {
    if (root == null) return;
    inOrder(root.left);
    ans.push(root.val);
    inOrder(root.right);
  }
  inOrder(root);
  for (let i = 0; i + 1 < ans.length; i++) {
    if (ans[i] > ans[i + 1]) return false;
  }
  return true;
}
