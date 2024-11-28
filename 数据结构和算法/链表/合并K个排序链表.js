// 使用优先队列（最小堆）：将每个链表的头节点放入优先队列中。
// 每次从优先队列中取出最小的节点：将该节点添加到结果链表中，并将该节点的下一个节点（如果存在）加入优先队列。
// 重复上述过程：直到优先队列为空，所有节点都被处理完毕。

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function mergeKLists(lists) {
  if (lists.length === 0) return null;

  // 创建一个优先队列（最小堆）
  const minHeap = new MinHeap();

  // 将每个链表的头节点加入优先队列
  lists.forEach((list) => {
    if (list) {
      minHeap.push(list);
    }
  });

  // 创建一个虚拟头节点
  const dummy = new ListNode(0);
  let current = dummy;

  // 从优先队列中取出最小的节点，直到队列为空
  while (!minHeap.isEmpty()) {
    const node = minHeap.pop(); // 弹出堆顶
    current.next = node; // 接到新的链表上
    current = current.next; // 指针往下走一步

    // 将取出节点的下一个节点加入优先队列，将最小节点的next插入堆里，就是把4插进来和，其他的1,2，进行pk
    if (node.next) {
      minHeap.push(node.next);
    }
  }

  return dummy.next;
}

// 最小堆类
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
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

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].val > this.heap[index].val) {
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
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let smallest = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      if (
        leftIndex < length &&
        this.heap[leftIndex].val < this.heap[smallest].val
      ) {
        smallest = leftIndex;
      }
      if (
        rightIndex < length &&
        this.heap[rightIndex].val < this.heap[smallest].val
      ) {
        smallest = rightIndex;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

// 示例
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));
const lists = [list1, list2, list3];

const result = mergeKLists(lists);

// 打印结果
let current = result;
while (current) {
  console.log(current.val);
  current = current.next;
}
// 输出：1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
