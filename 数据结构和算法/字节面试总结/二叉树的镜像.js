/**
 * 
 * @param { * 
首先想到的就是递归，递归总是从解决一个大问题开始，
不断转化为小的子问题，最后通过最小子问题的答案再推出大问题的最终结果。
 本题中的大问题是输入一个根节点，输出树的镜像，可以分两步：
交换左右子树
得到左右子树的镜像
终止条件为左右子树为空} pRoot 
 * @returns 
 */
function Mirror(pRoot) {
  // write code here
  if (!pRoot) {
    return null;
  }
  pRoot.mid = pRoot.left;
  pRoot.left = pRoot.right;
  pRoot.right = pRoot.mid;
  Mirror(pRoot.left);
  Mirror(pRoot.right);

  return pRoot;
}
