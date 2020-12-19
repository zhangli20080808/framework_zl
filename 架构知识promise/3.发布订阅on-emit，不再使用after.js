const fs = require('fs')

//希望 两次都完成后 分别打印最终结果 再打印一次处理完毕
//发布 订阅 一种一对多的关系  [fn,fn,fn]

class Events {
  constructor () {
    this.stack = []
  }

  on (callback) {
    this.stack.push(callback)
  }

  emit () {
    this.stack.forEach(callBack => callBack())
  }
}

let school = {}
let event = new Events()

event.on(function () {
  if (Object.keys(school).length === 2) {
    console.log(school)
  }
})
event.on(function () {
  console.log('当前获取完毕')
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  school.name = data
  event.emit()
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  school.age = data
  event.emit()
})
