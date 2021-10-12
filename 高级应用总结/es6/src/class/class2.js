class Animal{ 
    constructor(){
        this.type = '哺乳类';
    }
    static get flag(){ 
        return '动物'
    }
    eat(){
        console.log('eat');
    }
}
// es6中的继承 
// Tiger.__proto__ = Animal;// 继承父类的静态属性或者方法
// Animal.call(this)
// Tiger.prototype = Object.create(Animal.prototype)
class Tiger extends Animal{
    constructor(){ // 在使用this之前必须调用super
        super(); // Animal.call(this);
    }
    static getFlag(){
        return super.flag // 静态方法中的super指向的是父类
    }
    eat(){ // 类的重写
        super.eat(); // 父类的原型  死的
    }
}
let tiger = new Tiger('白老虎');
console.log(Tiger.flag)
tiger.eat();


// super static  get/set