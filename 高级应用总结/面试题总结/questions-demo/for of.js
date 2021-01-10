/*
* 与for in 区别
* for of无法循环遍历对象
* */

// let userMsg = {
//   0: 'nick',
//   1: 'freddy',
//   2: 'mike',
//   3: 'james'
// }
// for (let key in userMsg){
//   console.log(key) //索引值
// }
// console.log('-----------分割线-----------');
//
// //TypeError: userMsg is not iterable
// for(let i of userMsg){
//   console.log(i)
// }

// 遍历输出结果不同
// let arr = ['nick', 'freddy', 'mike', 'james']
//
// for (let key in arr) {
//   console.log(key)  //拿到的是索引
// }
// console.log('-----------分割线-----------')
// for (let key of arr) {
//   console.log(key)  // 拿到的是每一个key
// }

//for in 会遍历自定义属性，for of不会
// 给数组添加一个自定义属性name，并且赋值"数组"。
// 然后进行遍历输出的，会发现新定义的属性也被for in输出来了，而for of并不会对name进行输出。

let arr = ['nick', 'freddy', 'mike', 'james']
arr.name = '数组'

for (let key in arr) {
  console.log(key + ': ' + arr[key])
}
console.log('-----------分割线-----------')
for (let item of arr) {
  console.log(item)
}

// for in 不管遍历数组还是对象拿到的都是索引值  for of 不能遍历对象  可以遍历数组 拿到的是选项