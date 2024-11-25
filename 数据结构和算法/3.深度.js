/**
深度优先遍历：尽可能深的搜索树的分支
广度优先遍历：先访问距离根节点最近的节点
*/
// dfs
const treeData = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [],
        },
        {
          val: 'e',
          children: [],
        },
      ],
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [],
        },
        {
          val: 'g',
          children: [],
        },
      ],
    },
  ],
};

/**
 * 深度
1. 访问根节点
2. 对根节点的children挨个进行深度优先遍历
 * @param {*} root 
 */
const dfs = (root) => {
  console.log(root.val);
  root.children.forEach(dfs);
};
// console.log(dfs(treeData), 'con');
// a
// b
// d
// e
// c
// f
// g
// undefined con

/**
 * 广度
1. 新建一个队列，把根节点入队  -> 根节点 a，
2. 把队头出队并访问，
3. 把队头的children挨个入队
4. 重复第二，第三步骤，直到队列为空
 * @param {*} root 
 */
const bfs = (root) => {
  const queue = [root];
  console.log('[ queue ] >', queue);
  while (queue.length > 0) {
    const n = queue.shift();
    console.log(n.val);
    n.children.forEach((item) => {
      queue.push(item);
    });
    console.log('[ push ] >', queue);
  }
};
bfs(treeData);
// a
// b
// c
// d
// e
// f
// g

const dfs2 = (root) => {
  console.log(root.val);
  root.children((item) => dfs2(item));
};

