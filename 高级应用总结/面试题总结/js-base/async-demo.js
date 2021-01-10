// // 异步 （callback 回调函数）
// console.log(100)
// setTimeout(() => {
//     console.log(200)
// }, 1000)
// console.log(300)
// console.log(400)

// 同步
// console.log(100)
// alert(200)
// console.log(300)
//

//自执行函数不进行预解释
var a = 10
// (function () {
//   console.log(a) //1 undefined
//   a = 5
//   console.log(window.a) //10
//   var a = 20;
//   console.log(a)  //20
// })()
var b = 10;
(function () {
  b = 20
  console.log(b, '2')
})()

// setTimeout(()=>{
//   console.log('20')
// },2000)
// setTimeout(()=>{
//   console.log('21')
// },2500)
//