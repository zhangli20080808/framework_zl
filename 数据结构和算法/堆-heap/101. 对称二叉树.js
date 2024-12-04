/**
 * 判断一个二叉树是否对称，转化为 判断 左右子树是否镜像
 * @param {*} root
 */
function isSy(root) {
  const isMirror = (l, r) => {
    if (
      l &&
      r &&
      l.val === r.val &&
      isMirror(l.left, r.right) &&
      isMirror(l.right, l.left)
    ) {
      return true;
    }
    return false;
  };
  return isMirror(root.left, root.right);
}
