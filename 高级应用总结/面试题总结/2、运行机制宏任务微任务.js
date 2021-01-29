console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
})
new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })
console.log('script end')
// script start => Promise => script end => promise1 => promise2 => setTimeout

/*
* 以上代码虽然 setTimeout 写在 Promise 之前，但是因为 Promise 属于微任务⽽ setTimeout 属
  于宏任务，所以会有以上的打印。
* 微任务包括 process.nextTick ， promise ， Object.observe ，
* MutationObserver(会监控dom的变化，比如创建一个文本，监控文本内容变化)
* 
* 浏览器是一个宏任务队列，node是多个宏任务队列
* 
* 宏任务包括 script ， setTimeout ， setInterval ， setImmediate ， I/O ， UI rendering
*
* 很多⼈有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先
  执⾏⼀个宏任务，接下来有异步代码的话就先执⾏微任务。
  *
  * 所以正确的⼀次 Event loop 顺序是这样的
	1. 执⾏同步代码，这属于宏任务
	2. 执⾏栈为空，查询是否有微任务需要执⾏
	3. 执⾏所有微任务
	4. 必要的话渲染 UI
	5. 然后开始下⼀轮 Event loop，执⾏宏任务中的异步代码
	
	通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有⼤量的计算并且需要操作 DOM 的话，为
了更快的 界⾯响应，我们可以把操作 DOM 放⼊微任务中。
* */