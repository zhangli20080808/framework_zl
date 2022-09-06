/**
1. 堆 - 是一种 完全二叉树(第一层第二层填满)
2. 所有的节点都大于等于(最大堆)或者小于等于(最小堆)他的子节点
js中的堆
1. 通常使用数组来表示堆
2. 任意节点的左侧子节点的位置 是 2 * index + 1
3. 任意节点的右侧子节点的位置 是 2 * index + 2

应用
1. 堆能高效的、快速的找出最大值，最小值
时间复杂度是 O(1)
2. 找出第K个 最大元素 或者 最小元素  - 构建一个最小堆
    a. 构建一个最小堆，并将元素依次插入堆中
    b. 当堆的容量超过K，就删除堆顶
    c. 插入结束后，堆顶就是第K个最大元素
*/

/**
 * js实现 最小堆类
1. 在类里面，声明一个数组，用来装元素
2. 主要方法：插入、删除堆顶，获取堆顶，获取堆大小

a.将值插入堆的底部，即数组的底部
b.然后上移动，将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值

 */
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  /**
   * 交换数组中的两个元素位置
   * @param {} i1
   * @param {*} i2
   */
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  /**
   * 和父元素进行比较
   * @param {*} index
   */
  shiftUp(index) {
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    // 上移
    this.shiftUp(this.heap.length - 1);
  }
}
const h = new MinHeap()
h.insert(3)
h.insert(2)
h.insert(1)
// [1,3,2]
