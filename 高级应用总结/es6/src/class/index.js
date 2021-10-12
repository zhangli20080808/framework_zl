// es6 类 es5 构造函数 （继承）
// es5 创建一个实例 通过构造函数

// 类中创建的实例有两种属性，一种是实例身上自己的 公共的
function Animal(){ // Animal()
    if(new.target === Animal){ // 我们不希望这个Animal类可以被new
        throw new Error('animal类不能被new 可以被继承')
    }
    this.type = '哺乳类'
}
// 每一个类有一个原型 对象
Animal.prototype.eat = function(){
    console.log('eat');
}
function Tiger(){
    Animal.call(this); // 继承了实例上的属性
}
function create(parentProptype){
    let Fn = function(){}
    Fn.prototype = parentProptype;
    let fn = new Fn();
    // fn.constructor = Tiger
    return fn;
}
Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}}); // 构建了一个中间元素指向父类
let tiger = new Tiger;
console.log(tiger.constructor)
// 继承公有属性
// Tiger.prototype.__proto__ = Animal.prototype;
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype);
tiger.eat();

// 不要直接newAnimal 抽象类 不能被实例化
// animal.eat();
// 原型链概念
// console.log(animal.__proto__ === Animal.prototype)
// console.log(animal.__proto__.hasOwnProperty('eat'))
// construcor在prototype 这个对象上
// console.log(animal.construtor === animal.__proto__.construtor)

// console.log(Animal.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__); // null


let obj2 = {b:2};
let obj  = Object.create(obj2);
obj.qq = 100
console.log(obj.qq,obj2);
