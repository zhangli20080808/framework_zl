// getter/setter
class Animal{ 
    constructor(){
        // if(new.target === Animal){
        //     throw new Error('animal类不能被new 可以被继承')
        // }
        this.type = '哺乳类';
        this._age = 100; // 提供中类的私有属性 #xx
    }
    // a = 1 // es7 实例上的属性
    get a(){ //  原型上的属性
        return this._age;
    }
    set a(newAge){
        this._age = newAge
    }
    static get flag(){ // es6中的静态属性
        return '动物'
    }
    eat(){ // 这里声明的变量都是当前类的原型上的
        console.log('eat');
    }
}
let animal = new Animal
animal.a= 100;
console.log(animal.a)
// console.log(animal.hasOwnProperty('a'))
// function Animal(){
//     if(!(this instanceof Animal)){
//         throw new Error('not new');
//     }
// }
// new Animal();