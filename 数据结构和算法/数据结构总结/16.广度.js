// https://juejin.cn/post/7356060104565997605?searchId=20240903133606A8E3B543AE51F67C061A

// 在JavaScript中，广度优先遍历（Breadth-First Search, BFS）是一种用于遍历或搜索树或图的算法。
// 这种算法从根节点（或任意节点）开始，访问最靠近根节点的节点。广度优先遍历使用队列数据结构来存储待访问的节点。
// 以下是一个使用JavaScript实现广度优先遍历的例子。假设我们有一个树形结构，每个节点都有一个children数组来存储其子节点。

function breadthFirstSearch(root) {
  if (root === null) {
    return;
  } // 使用队列来进行广度优先遍历
  const queue = [root];
  while (queue.length > 0) {
    const currentNode = queue.shift(); // 取出队列中的第一个节点
    console.log(currentNode.value); // 访问当前节点的值 // 将当前节点的所有子节点加入队列
    for (const child of currentNode.children) {
      queue.push(child);
    }
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
// 从根节点开始广度优先遍历
// breadthFirstSearch(tree);
const bfs = (root) => {
  // 根节点入队
  const queue = [root];
  while (queue.length > 0) {
    const p = queue.shift();
    console.log(p.value);
    p.children.forEach((item) => {
      queue.push(item);
    });
  }
};
console.log(bfs(tree));
// 在这个例子中，breadthFirstSearch函数首先检查传入的根节点是否为null。如果不是，它将根节点放入队列中。然后，它进入一个循环，只要队列不为空，就持续执行以下操作：

// 从队列中取出第一个节点（即最早入队的节点）。
// 访问（在这里是打印）该节点的值。
// 将该节点的所有子节点加入队列。

// 这个过程将确保树的遍历按照广度优先的方式进行，即先遍历所有兄弟节点，再遍历子节点，一层层向下遍历。

function curry(fn, arr = []) {
  const length = fn.length;
  return (...args) => {
    const combineArgs = [...arr, ...args];
    if (combineArgs.length < length) {
      console.log(combineArgs, 'combineArgs');
      return curry(fn, combineArgs);
    } else {
      return fn.apply(this, combineArgs);
    }
  };
}

function add(a, b, c, d) {
  return a + b + c + d;
}

// const curryAdd = curry(add);
// console.log(curryAdd(10)(20)(30)); // 60
