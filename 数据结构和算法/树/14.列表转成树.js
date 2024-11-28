// 示例数据
const list = [
  { id: 1, name: 'Node 1', parentId: null },
  { id: 2, name: 'Node 1.1', parentId: 1 },
  { id: 3, name: 'Node 1.2', parentId: 1 },
  { id: 4, name: 'Node 2', parentId: null },
  { id: 5, name: 'Node 2.1', parentId: 4 },
  { id: 6, name: 'Node 2.2', parentId: 4 },
  { id: 7, name: 'Node 2.1.1', parentId: 5 },
];

function listToTree(list, parentId = null) {
  let map = {};
  let node,
    roots = [];
  let i;
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = { ...list[i], children: [] };
  }
  // {1: {id, name,parentId, children }, 2: {}}
  for (let i = 0; i < list.length; i++) {
    const current = list[i];
    node = map[current.id];
    if (current.parentId === parentId) {
      // 根节点
      roots.push(node);
    } else {
      map[current.parentId].children.push(node);
    }
  }
  console.log(map);
  return roots;
}

// 转换列表为树
const tree = listToTree(list);
// 打印树形结构
function printTree(tree, level = 0) {
  tree.forEach((node) => {
    console.log(`${'--'.repeat(level)} ${node.name}`);
    if (node.children.length > 0) {
      printTree(node.children, level + 1);
    }
  });
}
printTree(tree);
const obj = {
  id: 1,
  name: '部门A',
  children: [
    {
      id: 2,
      name: '部门B',
      children: [
        { id: 4, name: '部门D' },
        { id: 5, name: '部门E' },
      ],
    },
    {
      id: 3,
      name: '部门C',
      children: [{ id: 6, name: '部门F' }],
    },
  ],
};

// 树转成列表
function convertTreeToList(obj) {
  const arr = [];
  const nodeToParent = new Map();
  const queue = [];
  queue.unshift(obj);
  while (queue.length > 0) {
    const node = queue.pop();
    const { id, name, children = [] } = node;
    const parentNode = nodeToParent.get(node);
    const parentId = parentNode ? parentNode.id : 0;
    const item = { id, name, parentId };
    arr.push(item);
    children.forEach((child) => {
      nodeToParent.set(child, node); // set当前孩子节点的父节点是谁，为上面找父节点做准备
      queue.unshift(child); // 入队
    });
  }
  return arr;
}
const arr1 = convertTreeToList(obj);
console.info(arr1);
