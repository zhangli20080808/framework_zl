// 将类数组转化为数组 Array.form [...{}] 是通过迭代器来实现的  Symbol.interator  里面是生成器

function ajax () {
  // for of 也是要拥有  Symbol.interator 方法的 也就是说我们的类数组要拥有这个方法
  console.log([
    ...{
      0: 1,
      1: 2,
      length: 2,
      [Symbol.iterator]: function * () {
        let i = 0
        while (this.length !== i) {
          yield this[i++]
          // {value:0,done:false}  默认让生成器执行 调用它的next方法 遇到yield暂停 会把value 和done拿出来 把拿到的值放到数组中
        }
      },
    },
  ]) //[1,2]
}

// ajax('url', 'get')

// set / map 去重 不能放重复类型

// set 放的是一个个的值 map 放的是键值对 他是具备 Symbol.interator  所以所是可以迭代的
// Symbol.interator for of forEach

// let set = new Set([1, 2, 3, 1, 2, 3])
// set.add(5)
// set.forEach((element) => {
//   console.log(element)  // 1 2 3
// })
// console.log(set.values())
// Object.entries  es5
// Object.keys()
// Object.values()
// let obj = {name:1,age:2}
// console.log(Object.entries(obj));

// 请实现 交集 并集 差集

let arr1 = [1, 2, 3, 4, 1, 2, 3]
let arr2 = [4, 5, 6]

function union (arr1, arr2) {
  let s = new Set([...arr1, ...arr2])
  return [...s]
}

// console.log(union(arr1, arr2))

function intersection (arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2) // has
  return [...s1].filter((item) => {
    return s2.has(item)
  })
}

// console.log(intersection(arr1, arr2))

// let arr1 = [1, 2, 3, 4, 1, 2, 3]
// let arr2 = [4, 5, 6]

function difference (arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2) // has
  return [...s2].filter((item) => {
    return !s1.has(item)
  })
}

// console.log(difference(arr1, arr2))

// 内存泄漏  浏览器 垃圾会收机制 标记清除
let map = new Map([shoushou'j
  ['a', 1],
  ['a', 100],
  ['b', 2],
]) // 二维数组  {a:1,b:2}
let obj = { name: 1 }
map.set(obj, 1) 
obj = null // 虽然设置了null 但是 map set了obj 所以还不能释放
console.log(map)
