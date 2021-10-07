/*
 * 模块化的概念 (保护多个文件之间 相互独立 互不影响)
 * 1. 如果定义在global上的属性，肯定是要给全局变量属性
 * 2. node里面默认在文件中打印this的问题
 * node中里面为了实现模块化给每个文件都包装了一个函数，这个函数中的this就被更改掉了
 * */

// node里面默认在文件中打印this的问题
// 1. 在文件中运行 -> {} 这个对象 其实是 module.exports 在文件默认执行的时候，这个文件会被加一层函数
// 2. 在node环境中运行 this===global ->true
console.log(this === module.exports); // => true

/**
 * 每次每个模块运行的时候 会默认传入 这几个参数 exports require Module __filename __dirname
 * 通过函数的参数进行传入我们在文件中可以直接访问
 * 1. __filename 代表当前执行文件 - 绝对路径
 * 2. __dirname 代表当前文件运行的文件夹 - 绝对路径
 * 3. process.cwd() 当前工作目录下,是可以改变的
 */
// console.log(arguments) // 会打印出上面4个参数，直接运行的话
console.log(__filename); // /Users/zhangli/framework_zl/node/1.global.js
console.log(__dirname); //  /Users/zhangli/framework_zl/node

/**
 * exports require module,node中模块化会使用到这三个参数
 * 模块化好处
 * 1. 帮我们解决命名冲突的问题(原理：每个文件外面都会包装一个函数)
 * 2. 高内聚低耦合 (把相关的代码放到一个模块中)
 * node 的规范 commonjs规范(每个js就是一个模块)
 * 2. 模块之间可以项目引用，前提 -> 模块的导出  module.exports
 * 3. 模块的导入 require
 *
 * 常用规范
 * 1. esModule es6模块规范 export import
 * 2. cmd -> seajs
 * 3. amd -> requirejs
 * 4. umd -> 统一模块化规范

 * 主流的两个模块 -> es6模块规范和commonjs的简单区别
 * 1. node中默认不支持es6模块,需要babel去转义
 * 2. commonjs是动态引入、可以根据条件引入，import静态引入
 *
 * node中的模块化实现  === webpack模块化的引入 (node中模块如何进行加载)
 *
 * node中的模块分类
 * 1. 核心模块/内置模块 fs http path 不需要安装 引入的时候不需要增加相对路径、绝对路径
 * 2. 第三方模块 需要安装
 * 3. 自定义模块 需要通过相对路径或者绝对路径引入
 */

// console.log(Object.keys(global))
//  process 进程
// console.log(process)
// 常用方法 process.platform  argv cwd env nextTick:
// console.log(process.platform) // 进程运行的平台  max-> darwin  window-> win32
// console.log(process.argv) // 当前进程执行时所带的参数 默认是数组类型参数，前两个是固定的

// 1. 当前node的执行命令文件
// 2. 当前执行的文件是谁 -> node+文件执行时 可以传递参数 这些参数可以放到数组第三项...
// 主要用来用来解析用户传递的参数 看看是否存在port端口
// node 1.global.js --port 3000 --config true
// ->{ port: '3000', config: 'true' }
// -> help的各种提示 流行库 commander yargs(webpack) ora可以实现进度条
// const r = process.argv.slice(2).reduce((memo, current, index, array) => {
//   if (current.startsWith('--')) {
//     memo[current.slice(2)] = array[index + 1]
//   }
//   return memo
// }, {})

console.log(process.cwd()); // 当前进程执行时的工作目录 比如webpack找配置文件 当前工作目录下
// console.log(process.env)  // 当前进程的环境变量 在当前命令行设置环境变量 mac cross-env 设置 在process.env去拿

console.log(process.nextTick);
// node中实现的微任务，优先级比 promise 还高
// nextTick和promise是两个队列 所以会先清空 nextTick 队列

process.nextTick(() => {
  console.log(1)
  process.nextTick(() => {
    console.log(2)
    process.nextTick(() => {
      console.log(3)
    })
  })
})
Promise.resolve().then(() => console.log('promise'))

// node的事件环 在nodeV10版本之后，统一执行效果和浏览器一致 新增了 nextTick和 setImmediate
// 如果 setImmediate 和  setTimeout在默认的环境下执行 ，会受性能影响，在不设置时间的前提下
// 每个宏任务执行完毕之后都会执行微任务 老版本是每个队列清空后清空微任务
// https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
const fs = require('fs'); // readFile 是在pool执行 poo l之后是 check setImmediate 之后 在执行timers把
fs.readFile('.gitignore', 'utf8', (err, data) => {
  setImmediate(() => { // node中的宏任务，会立即执行，和setTimeout有什么区别呢？
    // 异步
    console.log('异步 -> setImmediate'); // node中的宏任务
  });
  setTimeout(() => {
    console.log('setTimeout');
  }, 2);
});
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
 两种可能 - 从pool绕，从根绕
 1. 当前进来之后，走到pool就停住了，等会儿 定时器到了，在回到timers，不停的这样轮询
 2. 还有一种情况就是 刚进来 发现有check，有close，接着走底部回调，再到timers
 */

setImmediate(() => {
  console.log('setImmediate1')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
})
setImmediate(() => {
  console.log('setImmediate2')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
  process.nextTick(() => {
    console.log('nextTick2')
  })
})
process.nextTick(() => {
  console.log('nextTick1')
})
// nextTick1  setImmediate1 promise1 setImmediate2 nextTick2 promise2
//  Buffer 是node中为了操作二进制数提供的一个类
// 'global', 'clearInterval', 'clearTimeout', 'setInterval', 'setTimeout', 'queueMicrotask', 'clearImmediate', 'setImmediate'

// console.log(global.encodeURIComponent)
//[Function: encodeURIComponent] global上拥有v8引擎上的一些方法，都是存在的
