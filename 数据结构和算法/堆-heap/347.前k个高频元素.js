/**
 * 返回出现 频率前 K 高的元素
1. 可以记录每个元素出现的次数，如果有，每次+1
2. 对其进行排序
3. 返回结果

算法复杂度 
原生
1. 循环O(n) 
2. sort 算法复杂度 O(n)*log(n)
 * @param {*} nums 
 * @param {*} k 
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 获取父节点索引
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  // 获取左侧节点
  getLeftIndex(index) {
    return index * 2 + 1;
  }
  // 获取右侧节点
  getRightIndex(index) {
    return index * 2 + 2;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  /**
   * 1. 初始位置：新元素被插入到堆的末尾。
     2. 比较与交换 
      获取当前节点的父节点索引。对于索引为 i 的节点，
      其父节点的索引为 Math.floor((i - 1) / 2)。
      如果当前节点的值小于其父节点的值，则交换这两个节点的值。
    3. 继续上浮 - 将当前节点的索引更新为其父节点的索引。
    重复上述比较和交换的过程，直到当前节点不再小于其父节点的值，或者到达堆的根节点。
   * @param {*} index 
   */
  shiftUp() {
    const index = this.heap.length - 1;
    if (index === 0) return; // 如果上移到堆的顶点，就不要上移了
    const parentIndex = this.getParentIndex(index);
    // 如果父节点的值》当前节点的值，此时堆节点不对，需要交换
    if (this.heap[parentIndex]?.value > this.heap[index]?.value) {
      this.swap(parentIndex, index);
      // 交换完节点还有可能继续往上移动 ，调用 shiftUp， 不过入参为 父节点了
      // 什么时候上移结束呢？
      this.shiftUp(parentIndex);
    }
    // while方式 迭代方式
    // while (index > 0) {
    //   if (this.heap[parentIndex] <= this.heap[index]) break;
    //   [this.heap[parentIndex], this.heap[index]] = [
    //     this.heap[index],
    //     this.heap[parentIndex],
    //   ];
    //   index = parentIndex
    // }
  }
  insert(value) {
    this.heap.push(value);
    // 保证堆的结构是正确的，进行一个上移的操作，把这个值移动到合适的位置
    this.shiftUp();
  }
  shiftDown(index) {
    // 获取左侧节点, 传入当前节点下标
    const leftIndex = this.getLeftIndex();
    const rightIndex = this.getRightIndex();
    // 如果左侧节点《 当前节点，需要交换
    if (this.heap[leftIndex]?.value < this.heap[index]?.value) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex); // 找到合适位置
    }
    if (this.heap[rightIndex]?.value < this.heap[index]?.value) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex); // 找到合适位置
    }
  }
  // 删除堆顶
  // 1. 用数组尾部元素替换顶部 （直接删除会破坏堆的结构）
  // 2. 然后下移动，将新堆顶和子节点进行交换，直到子节点大于等于这个新堆顶
  pop() {
    // 交换首尾元素
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  // 获取堆顶 - 返回数组的头部
  // 获取堆的大小 - 返回数组的长度
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}
// function topK(nums, k) {
//   const map = new Map();
//   nums.forEach((p) => {
//     map.set(p, map.has(p) ? map.get(p) + 1 : 1);
//   });
//   // 堆map进行处理
//   const list = Array.from(map).sort((a, b) => b[1] - a[1]);
//   const res = list.slice(0, k).map((item) => item[0]);
//   console.log(res);
//   return res;
// }
// 没有必要对所有元素进行排序，利用堆的特性，只拿到第K个元素就行，注意map对象
// 后续会比较map对象的value值，值大了，自然就下城下去了
function topK2(nums, k) {
  const map = new Map();
  nums.forEach((p) => {
    map.set(p, map.has(p) ? map.get(p) + 1 : 1);
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
const arr = [1, 1, 1, 2, 2, 3, 4, -1, -1, -1, 3];
topK2(arr, 2);
