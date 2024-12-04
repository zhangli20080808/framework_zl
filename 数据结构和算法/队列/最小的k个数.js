// 最小的K个数
function GetLeastNumbers_Solution(input, k) {
  let arr = input.sort((a, b) => a - b);
  return arr.splice(0, k);
}function smallestK(nums, k) {
  const maxHeap = new MaxHeap();
  
  for (let num of nums) {
      if (maxHeap.size() < k) {
          maxHeap.push(num);
      } else if (num < maxHeap.peek()) {
          maxHeap.pop();
          maxHeap.push(num);
      }
  }
  
  return maxHeap.toArray();
}

class MaxHeap {
  constructor() {
      this.heap = [];
  }

  push(val) {
      this.heap.push(val);
      this.bubbleUp(this.heap.length - 1);
  }

  pop() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);
      return top;
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
              [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
              index = parentIndex;
          } else {
              break;
          }
      }
  }

  bubbleDown(index) {
      const length = this.heap.length;
      const leftChildIndex = (i) => 2 * i + 1;
      const rightChildIndex = (i) => 2 * i + 2;

      while (leftChildIndex(index) < length) {
          let largestIndex = index;
          if (this.heap[leftChildIndex(index)] > this.heap[largestIndex]) {
              largestIndex = leftChildIndex(index);
          }
          if (rightChildIndex(index) < length && this.heap[rightChildIndex(index)] > this.heap[largestIndex]) {
              largestIndex = rightChildIndex(index 