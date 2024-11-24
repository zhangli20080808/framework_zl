/**
1. 链表结构
2. 链表指向
 */
// interface ILinkListNode {
//   value: any;
//   next?: ILinkListNode;
// }

function createLinkList(arr = []) {
  // 如果数组为0，直接报错返回
  if (arr.length === 0) throw new Error('arr is empty');
  if (arr.length === 1) return arr;
  // [100, 200, 300]
  // { value: 300 }
  // { value: 200 ,next: { value: 300 }}
  // { value: 100 ,next: { value: 200, next:{ value: 300 } }}

  let currentNode = {
    value: arr[arr.length - 1],
  };
  // 倒着循环的方式
  for (let i = arr.length - 2; i >= 0; i--) {
    const cur = arr[i];
    currentNode = {
      value: cur,
      next: currentNode,
    };
  }
  return currentNode;
}

// 测试
const arrTest = [100, 200, 300];
const ps = createLinkList(arrTest);
console.log(ps);
