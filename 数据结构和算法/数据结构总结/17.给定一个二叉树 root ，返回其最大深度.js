// 给定一个二叉树 root ，返回其最大深度。

const createPromise = async (p) => {
  return p;
};
const p1 = createPromise(100);
const p2 = createPromise(200);
const p3 = createPromise(300);
const list = [p1, p2, p3];
// Promise.all(list).then((res) => {
//   console.log(res);
// });
for await (let res of list) {
  console.log(res);
}

/**
 * 1. 实现 insert 2. shiftUp
shiftDown - pop -   peek - size
 基础方法 getParentIndex getRightIndex getLeftIndex swap
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndex() {
    return index * 2 + 1;
  }
  getRightIndex() {
    return index * 2 + 2;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  insert(n) {
    this.heap.push(n);
    const index = this.heap.length - 1;
    this.shiftUp(index);
  }
  // 1. 比较，交换 2. 继续上浮
  shiftUp(index) {
    // 要拿到父元素
    const parentIndex = this.getParentIndex(index);
    // 如果当前元素 《 腹肌元素
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      // 交换完成之后 针对腹肌元素  继续上浮
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    // 要拿到父元素
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    // 如果 左节点 《 当前元素
    if (this.heap[leftIndex] > this.heap[index]) {
      this.swap(leftIndex, index);
      // 交换完成之后 针对腹肌元素  继续上浮
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      // 交换完成之后 针对腹肌元素  继续上浮
      this.shiftDown(rightIndex);
    }
  }
  // 删除元素
  pop() {
    // 收尾元素交换
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  }
}
const h = new MinHeap();
h.inert(3);
h.inert(2);
h.inert(1);
h.pop();

// 前K个高频元素
function topK2(nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const h = new MinHeap();
  map.forEach((key, value) => {
    h.insert({ key, value });
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.heap.map((item) => item.key);
}
