// 箭头函数的特点 没有this 没有arguments 没有会向上查找 没有protoype

// 参数是一个可以省略()  如果 不写return 可以不写{}
// 如果返还的是一个对象 需要用()包裹起来
// function a(x){
//     return function(y){
//         return x + y;
//     }
// }
// let a = x => y => ({q:x+y}) 

// 解决this问题 (class this指向问题)

// let a =1; // 此变量不会声明到windw上
let obj = { // 对象不是作用域
    a : 2,
    fn:(...args)=>{ // this
        setTimeout(()=>{
            console.log(this.a,args)
        });
    }
}
obj.fn(1,2,3);

// 不能给箭头函数设置protoptype
    