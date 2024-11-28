// 在JavaScript中可以使用一个大小为k的最小堆来找到第K个最大元素。
// 当堆的大小超过k时，移除堆顶元素。
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (parent <= element) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;
    const length = this.heap.length;

    if (left < length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    if (smallest !== index) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = temp;
      this.sinkDown(smallest);
    }
  }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (let num of nums) {
    minHeap.insert(num);
    if (minHeap.heap.length > k) {
      minHeap.extractMin();
    }
  }
  return minHeap.heap[0];
}
