// let 和 const 解决了哪些问题
// var 的特点
// 1) 变量提升   var function import
// var function 
// console.log(a);
// let a = 1;

// 2) var可以重复的赋值 Identifier 'a' has already been declared
// let a = 1;
// let a = 2;

// 3) js之前 并没有块作用域  全局  函数
// 污染全局变量 let声明的变量不会有污染的情况 
// let a = 100; // 暂存死区
// {
//     console.log(a);
//     let a = 1;
// }

for(let i = 0 ; i< 10;i++){ // i = 0;
    setTimeout(()=>{
        console.log(i); //向上级查找
    },100)
}

// const a = {}; // 不能更改的引用地址  只要不改变空间即可
// a.a = 100;;