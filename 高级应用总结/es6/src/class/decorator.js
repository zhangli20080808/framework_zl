// 类的装饰器 草案 没有被定下来
// @语法只能用在类中 (修饰类 修饰类中的方法 修饰类中的属性)
// @符号后面跟的是一个函数
// 1)
// @log1()
// @log2()
// class A{}  // 一个属性可以使用多个装饰器 ，执行的时候装饰器的时候是从下到上执行的
// function log1(){
//     console.log('outer1 log');
//     return function(target){
//         console.log('inner1 log')
//     }
// }
// function log2(){
//     console.log('outer2 log');
//     return function(target){
//         console.log('inner2 log')
//     }
// }

// 2) 修饰属性
function numerable(boolean){
    return function(target,key,descriptor){ // target指代的是类的原型 ,属性描述器 {enumberable,}
        // descriptor.enumerable = true;
        return {
            ...descriptor,
            enumerable : boolean
        }
    }
}
class MyClass{
    @readonly PI = 1; // this.PI = 1
    @numerable(true) // 参数表示是否可枚举
    get name(){}
    @numerable(true)
    eat(){}
}
let myClass = new MyClass();
function readonly(target,key,descriptor){
    descriptor.writable = false;
}
myClass.PI = 2;
console.log(myClass.PI)
for(let key in myClass){
    console.log(key);
}


// npm install