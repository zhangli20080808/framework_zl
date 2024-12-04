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
 * 平衡二叉树是指任意节点的左右子树的高度差不超过1。
 * 定义辅助函数：定义一个辅助函数 getHeight 来计算节点的高度。
递归判断：
对于每个节点，递归计算其左右子树的高度。
如果左右子树的高度差超过1，则该节点不平衡。
如果左右子树中有任何一个不平衡，则该节点不平衡。
返回结果：如果根节点及其所有子节点都平衡，则该二叉树是平衡二叉树。

 * @param pRoot TreeNode类 
 * @return bool布尔型
 */
function IsBalanced_Solution(root) {
  // write code here
  if (!root) return true;

  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1; // 左子树不平衡

    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1; // 右子树不平衡

    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // 当前节点不平衡

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return getHeight(root) !== -1;
}
