// 1.利用中间变量
// const arr = [1, 2, 3]
// const item = arr[0]
// arr[0] = arr[1]
// arr[1] = item
// console.log(arr) // [2,1,3]

//2. 数组解构赋值（数组长度大于2时不适用）

// const arr = ['one', 'two'];
// [arr[0], arr[1]] = [arr[1], arr[0]]

// console.log(arr) [ 'two', 'one' ]

// 3.splice方法, splice() 方法会直接对数组进行修改
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

//https://www.w3school.com.cn/jsref/jsref_splice.asp


// arr.splice(1,1,arr[0]) 将第二个值替换成第一个值
// ...arr.splice(1,1,arr[0])拿到被替换的值,即第二个值
// arr.splice(0,1,...arr.splice(1,1,arr[0]))将第一个值换成第二个值


// var arr = ['one','two'];

// arr.splice(0,1,...arr.splice(1,1,arr[0]))

// console.log(arr)