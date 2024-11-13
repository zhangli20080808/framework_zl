// js 主线程是单线程的，setTimeout,ajax js模型还是多线程的
// 多线程就是 同时干很多事

const { resolve } = require('../手写promise/promise');

// js当前执行的上下文 全局上下文

// 执行上下文 “栈” (先进后出)  队列 （先进后出）
// 作用域是什么时候创建的？ 声明的时候 js 静态的作用域
// 每个作用域中都有一个自己的AO对象，作用域链
// function a(){ // 调用a 时会产生一个执行上下文
//     let qq = 1
//     b();
//     function b(){
//         console.log(b);
//         function c(){}
//         c();
//     }
// }
// a();
// 默认执行全局的js文件  宏任务

// 新版的node 和 浏览器的效果完全一致  10之前

Promise.resolve().then((data) => {
  console.log('p2');
  setTimeout(() => {
    console.log('time2');
  });
});
setTimeout(() => {
  console.log('time1');
  Promise.resolve().then((data) => {
    console.log('p1');
  });
}, 0);
// time1先放入，执行 console.log('time1')，放了一个微任务

// 当宏任务执行完毕后 会先清空微任务，微任务执行完后，会执行宏任务（只拿出一个来执行）
// 执行完后会再去清空微任务，无线循环
// 宏任务：ui线程  script脚本  setTimeout
// 微任务：then (内部的then执行顺序是优先于 setTimeout)

// console.log(a);
// VO js中全局对象都在vo中 vo可以代理global上的属性
// AO 每个函数执行的时候 会将 vo -> AO 并且将上级作用域链和ao对象进行拼接
// https://blog.csdn.net/github_34514750/article/details/52901781
