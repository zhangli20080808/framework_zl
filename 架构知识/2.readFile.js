const fs = require('fs')

// 解决异步并发问题 主要依赖计数器 发送了多少请求 等这些个请求完成了 执行操作
function after (times, callback) {
  let school = {}
  return function out (key, value) {
    school[key] = value
    if (--times === 0) {
      callback(school)
    }
  }
}

let out = after(1, (school) => {
  console.log(school, 'school')
})
fs.readFile('./a.text', 'utf-8', function (err, data) {
  // console.log(data)
  out('name', data)
})

fs.readFile('./a.text', 'utf-8', function (err, data) {
  // console.log(data)
  out('age', data)
})
//上面的after只能接受一个回调 修改 接受多个  - 发布订阅
