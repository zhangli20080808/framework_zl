/**
 * 使用发布 订阅模式 实现上面的效果 也就是等两件事都做完了再去做别的
 * 订阅 就是先将要做的事情储存好  稍后发布的时候让订阅好的事情一次执行
 *
 * 思考？ 观察者模式和发布订阅 之间有什么关系？
 * 选观察者模式是包含发布订阅的
 */
let fs = require('fs')
// 发布和订阅没有 任何的关系 订阅的时候会找第三方托管给你，发布的时候会让第三方依次执行
let event = {
  _arr: [],
  on (fn) { //订阅
    this._arr.push(fn)
  },
  off () {  // 发布
    this._arr.forEach(fn => fn())
  }
}
let obj = {}
event.on(function () { //计划1  先订阅 再触发 订阅和发布之间没有关联  用来解耦操作
  console.log('数据来了')
})
event.on(function () {
  if (Object.keys(obj).length === 2) {
    console.log(obj)
  }
})
// node中异步方法  都有回调 可以热内他是一个高阶函数  并发的  同时去读取文件  读取完毕的时间不一样
fs.readFile('./name.txt', 'utf-8', (err, data) => {
  obj.name = data
  event.off(); //发布
})

fs.readFile('./age.txt', 'utf-8', (err, data) => {
  obj.age = data;
  event.off()
})

