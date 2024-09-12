/**
 *
在JavaScript中，深度优先遍历（Depth-First Search, DFS）是一种用于遍历或搜索树或图的算法。这个算法会尽可能深地搜索树的分支。
当节点v的所在边都已被探寻过，搜索将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。
如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止。
以下是一个简单的JavaScript函数，它实现了对树的深度优先遍历。这个函数假设树是由节点对象组成的，
每个节点对象都有一个children属性，该属性是一个包含该节点的所有子节点的数组。

 * @param {*} root 
 * @returns 
 */
function depthFirstSearch(root) {
  if (root === null) {
    return;
  }
  console.log(root.value); // 访问当前节点 // 遍历当前节点的所有子节点
  for (let i = 0; i < root.children.length; i++) {
    depthFirstSearch(root.children[i]);
  }
}
// 示例树结构
const tree = {
  value: 'root',
  children: [
    {
      value: 'child1',
      children: [
        { value: 'grandchild1', children: [] },
        { value: 'grandchild2', children: [] },
      ],
    },
    {
      value: 'child2',
      children: [
        { value: 'grandchild3', children: [] },
        { value: 'grandchild4', children: [] },
      ],
    },
  ],
};
// 从根节点开始深度优先遍历
depthFirstSearch(tree);
// 在这个例子中，depthFirstSearch函数首先检查传入的节点是否为null。如果是，函数就返回并不做任何事情。
// 否则，它会打印出当前节点的值，然后遍历并递归调用其所有子节点。这样就保证了每个节点都会被访问，并且是先访问其所有子节点，然后再访问其兄弟节点。
