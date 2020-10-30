let c = 3;
// let obj = {
//     a:1,
//     b:2
// }
// es5 属性访问器 Object.defineProperty
// let obj = {
//     get a(){
//         return c === 3?3:0;
//     },
//     set a(value){
//         c = value;
//     }
// }
// obj.a = 100;
// console.log(c);

let o = {}; // 可以在取值的时候 或者在设置值的时候 可以调用对应的方法
let val = '';
Object.defineProperty(o,'name',{
    // 是否可枚举的
    enumerable:true,
    configurable:true,
    // writable:true, 是否可写 和 value 连用  一旦有了 set get 就不要设置了
    // value:'1'
    get(){
        return val
    },
    set(value){
        val = value;
    }
});
delete o.name
console.log(o);


// 实现对象的深度监控