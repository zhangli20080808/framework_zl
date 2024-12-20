/**
 * Map Set 差异
    共同点：集合、字典，可以储存不重复的值
    不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存

    Map和对象的区别
        key 元素顺序  数据访问  迭代  Size  性能
    Map     简单类型  有序  .get()  是  是  好
    Object  复杂类型  无需  []      否  否  差 
 */
const m = new Map();
const o = { p: 'haha' };
m.set(o, 'content');
m.get(o); // content

m.has(o); // true
m.delete(o); // true
m.has(o); // false

// 两个数组的交集
/**
 * 1. 新建一个字典，遍历 nums1 加入字典
 * 2. 遍历 nums2 遇到字典里面有的值就选出，并从字典中删除
 */

const arr = [1, 2, 3, 4, 21, 31];
const arr2 = [3, 2, 1, 3, 4, 5, 2, 2, 33, 2];

function intersection(nums1, nums2) {
  const map = new Map();
  const res = [];
  nums1.forEach((item) => map.set(item));
  for (let i = 0; i < nums2.length; i++) {
    const element = nums2[i];
    if (map.has(element)) {
      // get也行
      res.push(element);
      map.delete(element);
    }
  }
  return res;
}
console.log('[ inter ] >', intersection(arr, arr2));
// weakMap  weakSet
/**
 * 1. 弱应用，防止内存泄露
 * 2. WeakMap只接受对象作为 键名不接受其他类型的值作为键名
 *    WeakMap的键名所指向的对象，不计入垃圾回收机制 不能遍历
 * weakMap 中添加完对象之后，这个对象之前该怎么销毁就怎么销毁
 * 不用管我 我引用了也没关系，不影响这个销毁的过程
 *
 * weakSet只能用对象做value - 成员只能是对象，而不能是其他类型的值
 * 不能遍历，因为是弱引用，随时可能消失
 * 因为是弱引用，所以没有forEach size  只能用add  has  delete
 * new WeakMap().set(1,2) 错误
 * new WeakMap().set(Symbol(),2) 错误
 *
 */

function deepClone(obj, hash = new WeakMap()) {
  // 过滤 null undefined
  if (obj == null) return obj;
  if (typeof obj !== 'object') return obj;
  // 判断是数组 还是对象 -  typeof instanceof constructor
  // 如果已经拷贝过了 我们就把拷贝过的结果直接返回 防止循环拷贝
  if (hash.has(obj)) {
    return hash.get(obj); //  解决循环引用的问题
  }
  let instance = Array.isArray(obj) ? [] : {};
  hash.set(obj, instance);
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      instance[key] = deepClone(obj[key], hash);
    }
  }
  return instance;
}
let obj = { name: 1, age: 2 };
// let a = { name: 1, age: obj };
// let b = deepClone(obj);
// b.name = '4556';
// console.log('[ b ] >', obj, b);
// [ b ] > { name: 1, age: 2 } { name: '4556', age: 2 }

obj.a = obj;
let b = deepClone(obj);
console.log('[ b ] >', b);
