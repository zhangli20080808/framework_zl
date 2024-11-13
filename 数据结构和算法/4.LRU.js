//  最近使用的一个缓存
// 如果你最近使用了，我就给你放到最前面
// 基础指向，比如最多缓存4个  1->2->3->4
// 如果有新增 同步插入 6->1->2->3 新增6删除4 ，如果再来一个2 ，2放到最前面
// 如果新增项，在链表中存在，移动到顶部，类似的lru cache的简单算法
// 使用链表的原因 - 删除，新增的操作很多并且很频繁，用一个合适的淘汰机制
// 使用Map模拟我们的链表  可以把我们的Map理解成链表，反着来用
const cache = new Map();
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4);
console.log(cache.keys().next());
// { value: 'a', done: false }
/**
 * @param {number} capacit
 */
const LRUCache = function (capacity) {
  this.cache = new Map();
  this.max = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const temp = this.cache.get(key);
  // 如果村子
  if (this.cache.has(key)) {
    this.cache.delete(key);
    this.cache.set(key, temp);
    return this.cache.get(key);
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
  } else if (this.cache.size >= this.max) {
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache, 'read');
lRUCache.get(1); // 返回 1
console.log(lRUCache, 'get 1');
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache, 'put 3');
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache, 'put 4');
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
console.log(lRUCache, 'get 3');
lRUCache.get(4); // 返回 4
console.log(lRUCache, 'get 4');

// console.log(lRUCache)
// LRUCache { cache: Map(2) { 2 => 2, 1 => 1 }, max: 2 } get 1
// LRUCache { cache: Map(2) { 1 => 1, 3 => 3 }, max: 2 } put 3
// LRUCache { cache: Map(2) { 3 => 3, 4 => 4 }, max: 2 } put 4
// LRUCache { cache: Map(2) { 4 => 4, 3 => 3 }, max: 2 } get 3
// LRUCache { cache: Map(2) { 3 => 3, 4 => 4 }, max: 2 } get 4

// const str = '{a(b[c]d)e}f'

// 遇到左括号，入栈
// 匹配到右括号，取出左括号，对比， 如果相同 pop 出来，不相同 返回false
// 返回 stack 的 length ==== 0 为止

function matchStr(str) {
  if (str.length === 0) return;
  let left = '{([';
  let right = '})]';
  const stack = [];
  const length = str.length;
  for (let i = 0; i < length; i++) {
    const cur = str[i];
    if (left.includes(cur)) {
      stack.push(cur);
    } else if (right.includes(cur)) {
      const p = stack[stack.length - 1];
      if (isMatch(cur, p)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// arr [1,2,3,4,5]
// const obj = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value:3,
//       next: ?
//     }
//   }
function createLinkList(arr) {
  const length = arr.length;
  if (length === 0) throw new Error('arr is empty');

  let curNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }

  return curNode;
}
console.log(createLinkList[(1, 2, 3, 4, 5)]);
