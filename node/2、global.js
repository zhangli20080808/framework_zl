/*
* 模块化的概念
* node中里面为了实现模块化给每个文件都包装了一个函数，这个函数中的this就被更改掉了
* */
// console.log(this)
// 1. 在文件中运行 -> {} 这个对象 其实是 module.exports 2. 在node环境中运行 this===global ->true
// console.log(this===module.exports)  => true

// console.log(Object.keys(global))
//  process 进程
// console.log(process)
// 常用方法 process.platform  argv cwd env nextTick:
console.log(process.platform) // 进程运行的平台  max-> darwin  window-> win32
console.log(process.argv) // 当前进程执行时所带的参数 默认两个参数 数组类型 前两个是固定的
// 1. 当前node的执行命令文件
// 2. 当前执行的文件是谁 node+文件执行时 可以传递参数 这些参数可以放到数组第三项...
// 用来解析用户传递的参数 看看是否存在port端口
// node 2、global.js --port 3000 --config true  ->{ port: '3000', config: 'true' } -> help的各种提示 流行库 commander yargs(webpack) ora可以实现进度条
// const r = process.argv.slice(2).reduce((memo, current, index, array) => {
//   if (current.startsWith('--')) {
//     memo[current.slice(2)] = array[index + 1]
//   }
//   return memo
// }, {})

console.log(process.cwd()) // 当前进程执行时的工作目录 比如webpack找配置文件 当前工作目录下
// console.log(process.env)  // 当前进程的环境变量 在当前命令行设置环境变量 mac cross-env 设置 在process.env去拿

console.log(process.nextTick)
// node中实现的微任务 优先级比 promise还高
// nextTick和promise是两个队列 所以会先清空 nextTick 队列

// process.nextTick(() => {
//   console.log(1)
//   process.nextTick(() => {
//     console.log(2)
//     process.nextTick(() => {
//       console.log(3)
//     })
//   })
// })
// Promise.resolve().then(() => console.log('promise'))

// node的事件环 在nodeV10版本之后，统一执行效果和浏览器一致 新增了 nextTick和 setImmediate
// 每个宏任务执行完毕之后都会清空微任务

// 如果 setImmediate 和  setTimeout在默认的环境下执行 回受性能影响
// 每个宏任务执行完毕之后都会执行微任务 老版本是每个队列清空后清空微任务
// https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
const fs = require('fs')
fs.readFile('.gitignore', 'utf8', (err, data) => {
  setImmediate(() => { // 异步
    console.log('setImmediate') // node中的宏任务
  })
  setTimeout(() => {
    console.log('setTimeout')
  }, 2)
})
/**
 * 当主站代码执行完毕后，会进入node的事件环(node自己实现的 event loop 每一个任务都有这样的一个队列，一个队列一个队列执行)
 *
 阶段概述
 定时器(timers)：存放定时器回调的 (执行成功都会放到timers这个队列) 浏览器中呢 会开辟一个宏任务队列去存储
 待定回调(pending callbacks)： 就是上一个没执行完毕的回调会在这里统一执行
 idle, prepare：仅系统内部使用。
 轮询(pool)：1. 存放IO的回调 2. 等待定时器到达时间
 检测(check)：setImmediate() 回调函数在这里执行。
 关闭的回调函数( close callbacks)：一些关闭的回调函数，如：socket.on('close', ...)。
 在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。

 总结

 默认当前主站代码执行完毕后，会进入事件环
 1. 会看当前定时器是否到达时间，如果到达时间，会执行定时器的回调
 2. 如果没到达 会走到pool阶段 pool会执行IO操作的回调，如果没有IO，会看下有没有 setImmediate，如果有会进入到 check 阶段
 3. 如果没有 要检查是否有定时器，如果没有定时器，IO操作则结束循环
 4. 如果有定时器，定时器到达时间后，会返回timers阶段 执行定时器的回调
 5. 每一个宏任务执行完毕后都会清空
 还有一种情况就是 刚进来 发现有check 接着走底部回调，再到timers

 */

//  Buffer 是node中为了操作二进制数提供的一个类
// 'global', 'clearInterval', 'clearTimeout', 'setInterval', 'setTimeout', 'queueMicrotask', 'clearImmediate', 'setImmediate'

// console.log(global.encodeURIComponent)
//[Function: encodeURIComponent] global上拥有v8引擎上的一些方法，都是存在的
