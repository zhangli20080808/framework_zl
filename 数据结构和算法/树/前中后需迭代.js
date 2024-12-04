function preorderTraversal(root) {
  // write code here
  let res = [];
  if (!root) return res;
  let stk = [root];
  while (stk.length) {
    let top = stk.pop();
    res.push(top.val);
    if (top.right) stk.push(top.right);
    if (top.left) stk.push(top.left);
  }
  return res;
}
function inOrder(root, resArr) {
  let node = root;
  const stack = [];
  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    const top = stack.pop();
    resArr.push(top.val);
    node = top.right;
  }
}
function inorderTraversal(root) {
  // write code here
  if (root == null) return [];
  const resArr = [];
  inOrder(root, resArr);
  return resArr;
}

function postorderTraversal(root) {
  // write code here
  let res = [];
  if (!root) return res;
  let stk1 = [root];
  let stk2 = [];

  while (stk1.length) {
    const n = stk1.pop();
    stk2.push(n.val);
    //此处与先序顺序相反
    if (n.left) stk1.push(n.left);
    if (n.right) stk1.push(n.right);
  }
  //console.log(stk2)
  while (stk2.length) {
    res.push(stk2.pop());
  }
  return res;
}
