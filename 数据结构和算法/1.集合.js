/**
基础方法 add size delete has
 迭代
集合是什么？
1. 无序且唯一的数据结构 
2. 
*/

let mySet = new Set();
let mySet2 = new Set();
mySet2.add('5');

mySet.add('1');
mySet.add('2');
mySet.add('5');
let a = { name: 'zl' };
mySet.add(a);
// console.log(mySet);
console.log(mySet.entries());

// 迭代 set
// for (const iterator of mySet) {
//   console.log(iterator, 'iterator');
// }
for (const [key, value] of mySet.entries()) {
  console.log(key, value);
}
// set -> array
const myArr = [...mySet];
const myArr2 = Array.from(mySet);
// array -> set
const arrayToSet = new Set([1, 2, 3, 4]);

// 交集
const intersections = new Set([...mySet].filter((x) => mySet2.has(x)));
console.log(intersections, 'intersections');
// 差集
const different = new Set([...mySet].filter((x) => !mySet2.has(x)));
console.log(different, 'different');

// 349 - 数组交集
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

/**
 * 1. 用集合对nums1去重，遍历nums1，筛出nums2也包含的值
 * @param {*} nums1
 * @param {*} nums2
 * @returns
 */
const intersection = function (nums1, nums2) {
  // includes O(n)  整体 O(m*n)
  return [...new Set(nums1)].filter((v) => nums2.includes(v));
};
console.log(intersection(arr1, arr2), 'result');
