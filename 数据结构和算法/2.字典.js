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

/**
1."()" -> true
2. "()[]{}" -> true
3. "(]" -> false
思路1  使用栈  遇到将左括号推入栈中，遇到右括号，如果能和栈顶元素能组成一对 pop ，负责直接返回false
*/
function isValid(s) {
  // 如果是 奇数直接返回false
  if (s % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '{' || c === '(' || c === '[') {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === '(' && c === ')') ||
        (t === '{' && c === '}') ||
        (t === '[' && c === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

function isMatch(p, cur) {
  if (p === '(' && cur === ')') return true;
  if (p === '{' && cur === '}') return true;
  if (p === '[' && cur === ']') return true;
  return false;
}
/**
 * 1. '({[' 入栈
  2. 循环到右边 如果匹配到 出栈
 * @param {*} s 
 */
function isValid3(s) {
  let left = '({[';
  let right = ')}]';
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (left.includes(current)) {
      // 左括号，入栈
      stack.push(current); // ['(', '{', '[']
    } else if (right?.includes(current)) {
      // 有货号，判断栈顶部（stack最后一个元素） -是否出栈
      const top = stack[stack.length - 1];
      if (isMatch(top, current)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
let aString = '(){}[]'; // true
let aStringFalse = '(){}]['; // false
// console.log(isValid(aString), 'test');
// 优化
function isValid2(s) {
  if (s % 2 === 1) return false;
  const stack = [];
  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map.has(c)) {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (map.get(t) === c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
console.log(isValid(aString), 'test');
console.log(isValid3(aString), 'isValid3');

/**
使用 Map 优化两数之和的处理
1. 新建字典
2. 循环nums里面的值，逐个来寻找，没有合适的就先存着，有就直接返回
内存可能有点问题  主要是Map存储值的大小
*/
function toSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const n2 = target - n;
    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      // 没有
      map.set(n, i);
    }
  }
}
console.log(toSum([2, 7, 1, 3, 11], 13), 'sum');
