# event loop(事件循环 事件轮询)

js是单线程 异步要基于回调来实现，如何去实现的？ event loop就是异步回调的实现原理

图片可参考 ppt

```js
console.log('Hi')

setTimeout(function cb1() {
    console.log('cb1') // cb 即 callback
}, 5000)

console.log('Bye')
```

1.执行第一行代码 推入到执行栈中 执行结束 console.log 清空调用栈 2.setTimeout使我们的webapi 会将我们的cb1放入定时器中 5000后会放入 callback queue中 完了 清空调用栈
3.开始执行console 执行完 清空 执行栈这个时候为空了 这个时候就会启动event loop机制 看我们的callback queue中 是否有函数 有的话就放入 执行栈中去执行 5s后有了 放进去执行 发现一个console 打印
后面没代码了 清空执行栈

执行栈 调用栈 call stack

过程一

* 同步代码，一行一行放在 call stack 执行
* 遇到 异步 会先记录下 等待时机(定时器，网络请求)
* 时机到了 移动到callback queue 中

过程二

* 如 call stack (即同步代码执行完) eventloop开始工作
* 轮询查找 callback queue ，看有咩有异步回调过来，如果有 则移动到 call stack 中执行

同时 空闲的时候 会尝试dom渲染， 再触发eventloop 每次轮询之后 也会尝试触发dom渲染

* 然后继续轮询查找(永动机一样)

定时器是什么时候开始计时的？ 从执行定时器的时候开始计时。 但计时结束时，只是把回调函数放在 callback queue 中，不一定会立马执行。何时执行，还得看何时取出来放在 call stack 中。 ≥
------

DOM 事件，也用 event loop 也是基于回调 但不是异步

```html
<button id="btn1">提交</button>

<script>
console.log('Hi')

$('#btn1').click(function (e) {
    console.log('button clicked')
})

console.log('Bye')
</script>
```

事件触发线程管理的任务队列是如何产生的呢？ 事实上这些任务就是从JS引擎线程本身产生的，主线程在运行时会产生执行栈，栈中的代码调用某些异步API时会在任务队列中添加事件
，栈中的代码执行完毕后，就会读取任务队列中的事件，去执行事件对应的回调函数，如此循环往复，形成事件循环机制。 JS中有两种任务类型：微任务（microtask）和宏任务



