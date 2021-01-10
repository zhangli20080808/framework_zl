# async/await

callback hell

- 语法介绍
- 和 Promise 的关系
- 异步本质
- for...of

**有很多 async 的面试题，例如**

- async 直接返回，是什么
- async 直接返回 promise
- await 后面不加 promise
- 等等，需要找出一个规律

## 语法介绍

用同步的方式，编写异步。

```js
function loadImg(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error(`图片加载失败 ${src}`))
        }
        img.src = src
    })
    return promise
}

async function loadImg1() {
    const src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
    const img1 = await loadImg(src1)
    return img1
}

async function loadImg2() {
    const src2 = 'https://avatars3.githubusercontent.com/u/9583120'
    const img2 = await loadImg(src2)
    return img2
}

(async function () {
    // 注意：await 必须放在 async 函数中，否则会报错
    try {
        // 加载第一张图片
        const img1 = await loadImg1()
        console.log(img1)
        // 加载第二张图片
        const img2 = await loadImg2()
        console.log(img2)
    } catch (ex) {
        console.error(ex)
    }
})()
```

## 和 Promise 的关系

- async 函数返回结果都是 Promise 对象（如果函数内没返回 Promise ， 则自动封装一下，比如我们直接返回100）
- await 相当于 promise 的 then 我们使用 try catch 捕获异常 想想 await 和 then 后面的代码执行 微任务

```js
async function fn2() {
    return new Promise(() => {})
}
console.log( fn2() )

async function fn1() {
    return 100
}
console.log( fn1() ) // 相当于 Promise.resolve(100)
```

- await 后面跟 Promise 对象：会阻断后续代码，等待状态变为 resolved ，才获取结果并继续执行
- await 后续跟非 Promise 对象：会直接返回

```js
(async function () {
    const p1 = new Promise(() => {})
    await p1
    console.log('p1') // 不会执行
})()

(async function () {
    const p2 = Promise.resolve(100)
    const res = await p2 //  await 相当于 promise 的 then
    console.log(res) // 100
})()

(async function () {
    const res = await 100  // await Promise.resolve(100)
    console.log(res) // 100
})()

(async function () {
    const p3 = Promise.reject('some err')
    const res = await p3   //await相当于 then  p3返回 rejected 走catch不会走then
    console.log(res) // 不会执行
})()
```

- try...catch 捕获 rejected 状态 相当于promise.catch

```js
(async function () {
    const p4 = Promise.reject('some err') //rejected 状态 
    try {
        const res = await p4
        console.log(res)
    } catch (ex) {
        console.error(ex)
    }
})()
```

总结来看：

- async 封装 Promise
- await 处理 Promise 成功
- try...catch 处理 Promise 失败

## 异步本质

await 是语法糖 是同步写法，但本质还是异步调用。

```js
async function async1 () {
  console.log('async1 start') //2
  await async2() // 先去执行 async2 然后再去执行 await 这个操作
  
  //下面三行都是异步回调 callback 的内容 -- 微任务
  console.log('async1 end') //5
   // 关键在这一步，它相当于放在 callback 中，最后执行   相当于下面两个
  await async3()
   //下面一行是异步回调的内容
  console.log('async3 end') //7
}

async function async2 () {
  console.log('async2')  //3
}
async function async3(){
  console.log('async3') //6
}

console.log('script start') //1
async1()
console.log('script end') //4
```

即，只要遇到了 `await` ，后面的代码都相当于放在 callback 里。等待执行，类似于setimeout(cb1)

## for...of 异步遍历 for in forEach都是同步遍历

```js
// 定时算乘法
function multi(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}

// // 使用 forEach ，是 1s 之后打印出所有结果，即 3 个值是一起被计算出来的
// 因为是同步循环 不会等待任何东西 一遍一遍网下执行 瞬间会把这三个遍历结束，一瞬间拿 multi函数取计算 一瞬间执行三遍
// function test1 () {
//     const nums = [1, 2, 3];
//     nums.forEach(async x => {
//         const res = await multi(x);
//         console.log(res);
//     })
// }
// test1();

// 使用 for...of ，可以让计算挨个串行执行
async function test2 () {
    const nums = [1, 2, 3];
    for (let x of nums) {
        // 在 for...of 循环体的内部，遇到 await 会挨个串行计算
        const res = await multi(x)
        console.log(res)
    }
}
test2()
```
