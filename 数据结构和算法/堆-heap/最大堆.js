function quickSelect(nums, k) {
  if (k === 0 || nums.length === 0) return [];

  const partition = (left, right, pivotIndex) => {
    const pivotValue = nums[pivotIndex];
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivotValue) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }
    [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];
    return storeIndex;
  };

  const select = (left, right, kSmallest) => {
    if (left === right) return;

    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotIndexFinal = partition(left, right, pivotIndex);

    if (kSmallest === pivotIndexFinal) {
      return;
    } else if (kSmallest < pivotIndexFinal) {
      select(left, pivotIndexFinal - 1, kSmallest);
    } else {
      select(pivotIndexFinal + 1, right, kSmallest);
    }
  };

  select(0, nums.length - 1, k - 1);
  return nums.slice(0, k);
}

/**
 * 使用一个最大堆来存储当前最小的K个数。
遍历数组中的每个数：
如果堆的大小小于K，直接将当前数加入堆。
如果堆的大小已经达到K，且当前数小于堆顶元素，将堆顶元素移除，并将当前数加入堆。
遍历结束后，堆中存储的就是最小的K个数。
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
function getLeastNumbers(nums, k) {
  if (k === 0 || nums.length === 0) return [];

  // 构建最大堆
  const maxHeap = new MaxHeap();

  for (let num of nums) {
    if (maxHeap.size() < k) {
      maxHeap.add(num);
    } else if (num < maxHeap.peek()) {
      maxHeap.poll();
      maxHeap.add(num);
    }
  }

  return maxHeap.toArray();
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  poll() {
    if (this.size() === 0) return null;
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return max;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] < this.heap[index]) {
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    const lastIndex = this.heap.length - 1;
    while (true) {
      let maxIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (
        leftIndex <= lastIndex &&
        this.heap[leftIndex] > this.heap[maxIndex]
      ) {
        maxIndex = leftIndex;
      }

      if (
        rightIndex <= lastIndex &&
        this.heap[rightIndex] > this.heap[maxIndex]
      ) {
        maxIndex = rightIndex;
      }

      if (maxIndex !== index) {
        [this.heap[maxIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[maxIndex],
        ];
        index = maxIndex;
      } else {
        break;
      }
    }
  }

  toArray() {
    return this.heap.slice();
  }
}

// 示例用法
const nums = [3, 2, 1, 4, 5];
const k = 3;
const result = getLeastNumbers(nums, k);
console.log(result); // 输出: [1, 2, 3]
