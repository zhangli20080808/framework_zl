/*
* 浏览器和node中解析的方式不一样  在浏览器中 await后面直接跟一个promise 那就直接then
* node中虽然你放的是一个promise 会再进行一次包装 node中await后面的结果会被再包装一次
* */
async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
//  很奇怪 我这块代码和浏览器中运行的结果一样 node并没有帮我包装成promise
//   new Promise(resolve(async2())).then((data) => {console.log('async1 end')})
//   async2().then(resolve).then(()=>{console.log('async1 end')}) 两个then
}

async function async2 () {
  console.log('async2')
}

console.log('srcipt start')
setTimeout(() => {
  console.log('setTimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('end')
//  srcipt start -> async1 start -> async2 ->  promise ->  end -> async1 end -> promise2 -> setTimeout
