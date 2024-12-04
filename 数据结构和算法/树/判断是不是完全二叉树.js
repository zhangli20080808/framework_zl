/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *完全二叉树是指除最后一层外，其他层都是满的，并且最后一层的节点都尽可能靠左。
 * 
 * 初始化队列：将根节点加入队列。
层次遍历：
从队列中取出一个节点。
如果当前节点有左子节点，将左子节点加入队列。
如果当前节点有右子节点，将右子节点加入队列。
如果在某一层中遇到一个节点没有左子节点但有右子节点，或者在某一层中遇到一个节点没有右子节点但后续节点还有子节点，则该二叉树不是完全二叉树。
返回结果：如果遍历完整棵树都没有违反完全二叉树的条件，则该二叉树是完全二叉树。

 * @param root TreeNode类 
 * @return bool布尔型
 */
function isCompleteTree(root) {
  // write code here
  if (!root) return true;

  const queue = [root];
  let foundNull = false;

  while (queue.length > 0) {
    const node = queue.shift();

    if (node === null) {
      foundNull = true;
    } else {
      if (foundNull) {
        // 如果之前遇到过 null 节点，但现在又遇到了非 null 节点，说明不是完全二叉树
        return false;
      }
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return true;
}
