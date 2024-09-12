// 如果你最近使用了，我就给你放到最前面
// 基础指向  1->2->3->4
// 如果有新增 同步插入 6->1->2->3 新增6删除4
// 如果新增项，在链表中存在，移动到顶部，类似的lru cache的简单算法
// 使用链表的原因 - 删除，新增的操作很多并且很频繁
// 使用Map模拟我们的链表  可以把我们的Map理解成链表，反着来用
const cache = new Map();
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4);
console.log(cache.keys().next());
// { value: 'a', done: false }
/**
 * @param {number} capacity
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
console.log(lRUCache, 'get 1');
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
