// 发布 订阅模式

let fs = require('fs')
// 发布和订阅没有 任何的关系
let event = {
  _arr: [],
  on (fn) { //订阅
    this._arr.push(fn)
  },
  off () {
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
fs.readFile('./name.txt', 'utf-8', (err, data) => {
  obj.name = data
  event.off(); //发布
})

fs.readFile('./age.txt', 'utf-8', (err, data) => {
  obj.age = data;
  event.off()
})

// 观察者模式 (基于发布订阅模式，而且观察者模式和发布订阅模式之间是有关联的)