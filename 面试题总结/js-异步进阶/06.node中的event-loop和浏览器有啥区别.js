/*
* Node.js中宏任务分成了几种类型，并且放在了不同的task queue里
* 不同的task queue在执行顺序上也有区别，微任务放在了每个task queue的末尾：

setTimeout/setInterval 属于 timers 类型；
setImmediate 属于 check 类型；
socket 的 close 事件属于 close callbacks 类型；
其他 MacroTask 都属于 poll 类型。
process.nextTick 本质上属于 MicroTask，但是它先于所有其他 MicroTask 执行；
所有 MicroTask 的执行时机在不同类型的 MacroTask 切换后。
*
* 浏览器与 Node 事件轮询的不同点就在于宏任务是否归类与微任务何时执行。
* 在浏览器中，宏任务会按照事件队列中的顺序依次执行，宏任务有可能产生微任务，微任务队列会在当前宏任务执行结束后立即执行。
*
*
*
* timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
* I/O callbacks 阶段：执行一些系统调用错误，比如网络通信的错误回调
* idle, prepare 阶段：仅node内部使用
* poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
* check 阶段：执行 setImmediate() 的回调
* close callbacks 阶段：执行 socket 的 close 事件回调
*
* 在 Node 中 js 整体代码执行结束后，会将相应的宏任务放到相应的阶段，然后从 timer 阶段开始不断循环执行。
* 每个阶段产生的宏任务会放到其应该属于的阶段，产生的微任务队列会在当前阶段执行结束后立即执行。

* */

//https://www.jianshu.com/p/4881976e5fc8

setTimeout(() => {
  console.log('timer1')

  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')

  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)

Promise.resolve().then(function () {
  console.log('promise3')
})