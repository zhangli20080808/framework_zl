//split 分割

// const arr = [10, 20, 30, 40]

/*
* 1.功能是什么？
* 2.返回值是什么？
* 3.是否对原数组造成影响
*
* */
// pop 返回删除的那个值 对原数组  有影响
// const popRes = arr.pop()
// console.log(popRes, arr)  //40 [ 10, 20, 30 ]

// // shift  头部删除一个
// const shiftRes = arr.shift()
// console.log(shiftRes, arr)  // 10 [ 20, 30, 40 ]

//push
// const pushRes = arr.push(50) // 返回 length
// console.log(pushRes, arr) // 5  [ 10, 20, 30, 40, 50 ]

// unshift 头部添加一个
// const unshiftRes = arr.unshift(5) // 返回 length
// console.log(unshiftRes, arr)  //5 [ 5, 10, 20, 30, 40 ]

// 纯函数：  数组的api  有哪些是纯函数  什么是传函数呢？
// 1. 不改变源数组（没有副作用）；2. 返回一个数组

// const arr = [10, 20, 30, 40]

// concat 不影响，不改变
// const arr1 = arr.concat([50, 60, 70])
// console.log(arr,arr1)  // arr [ 10, 20, 30, 40 ]

// // map
// const arr2 = arr.map(num => num * 10)
// console.log(arr,arr2) //[ 10, 20, 30, 40 ] [ 100, 200, 300, 400 ]

// // filter
// const arr3 = arr.filter(num => num > 25)
// console.log(arr,arr3)  //[ 10, 20, 30, 40 ] [ 30, 40 ]

// // slice  创建一个副本 类似于做了一个深拷贝
// const arr4 = arr.slice()
// console.log(arr,arr4)

// // 非纯函数
// // push pop shift unshift
// // forEach 改变原始数组
// // some every
// // reduce

const arr = [10, 20, 30, 40, 50]

// // slice 纯函数  切片  返回值
// const arr1 = arr.slice()
// const arr2 = arr.slice(1, 4)  //[ 20, 30, 40 ]
// const arr3 = arr.slice(2)  //[ 30, 40, 50 ]

// const arr4 = arr.slice(-3)  //[ 30, 40, 50 ] 截取最后的3个

// console.log(arr,arr4)

/*
* splice 非纯函数  有明显的副作用  剪接
* splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
* 该方法会改变原始数组。
* arrayObject.splice(index,howmany,item1,.....,itemX)
* index howmany 要删除的项目数量。如果设置为 0，则不会删除项目  向数组添加的新项目。
* */

// const spliceRes = arr.splice(1, 2, 'a', 'b', 'c')  //[ 20, 30 ] [ 10, 'a', 'b', 'c', 40, 50 ]
// const spliceRes1 = arr.splice(1, 2)  //[ 20, 30 ] [ 10, 40, 50 ]
// const spliceRes2 = arr.splice(1, 0, 'a', 'b', 'c')  // [] [10, 'a', 'b', 'c',20, 30,  40,  50]
// console.log(spliceRes2, arr)

/*
* parseInt ->数字 (内核机制，需要将value变为字符串 从字符串第一个字符开始查找，找到的有效字符转化为数子，直到遇到一个非有效数子为止) // parseInt(null) -> parseInt('null')
*
* parseInt(string, radix) 把 string 看成 radix 进制的东西 最后转化为10进制
*  如果省略该参数或其值为 0，则数字将以 10 为基础来解析
*  如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
* */

const res = [10, 20, 30].map(parseInt)
console.log(res)  //[ 10, NaN, NaN ]

const res2 = [10, 10, 10].map(parseInt)
console.log(res2) //[ 10, NaN, 2 ]  看做二进制'10' 在转化为10进制 0*2^0+1*2^1

const res3 = [10.18, 0, 10, 25, 23].map(parseInt)
console.log(res3)  //10, NaN, 2, 2, 11]

// parseInt(10.18,0)  =>10
// parseInt(0,1) => NAN
// parseInt(10,2) => 0*2^0+1*2^1 ->2
// parseInt(25,3) => 看做三进制2  '2' 2*3^0 ->2
// parseInt(23,4) => 看做4进制  3*4^0+2*4^1 ->3+8 ->11

// // 拆解
  [10, 20, 30].map((num, index) => {
  return parseInt(num, index)
})

/*
* ajax  get  post区别
* get 主要用于查询  post主要用于提交数据
* get 参数拼接在url上 post放在请求体内(数据体积大)
* 安全性： post易于防止 csrf
*
*
* */

// Array.prototype.map 的第二个参数  thisValue - 执行回调时使用传递给函数，用作this的值
//如果省略了 thisValue 或者传入null undefined 回调函数的this指向全局
// Array.prototype.map(cb,thisValue)
var array = [1, 2, 3]
var a = {
  name: '123',
  mapObject: function () {
    array.map(function () {
      // 传入this的时候 123 123 123 不传this undefined undefined undefined
      console.log(this.name) 
    }, this) // 这个时候的this是什么呢？是a啊！
  }
}
// 可以这样理解 传入this之后 相当于 改变了this指向 类似于bind
a.mapObject() 