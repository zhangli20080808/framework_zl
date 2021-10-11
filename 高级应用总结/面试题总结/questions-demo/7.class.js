// 用es5 来模拟 es6的类 判断当前这个调用方式是不是通过new来调用的
// es6的类原型是不可枚举的

function defineProperty(Constructor, protoProperties) {
  if (Array.isArray(protoProperties)) {
    for (let i = 0; i < protoProperties.length; i++) {
      const prototype = protoProperties[i];
      Object.defineProperty(Constructor.prototype, prototype.key, {
        configurable: true,
        enumerable: true,
        ...prototype,
      });
    }
  }
}
var Animal = (function () {
  function Animal() {
    this.name = 'zl';
    if (!(this instanceof Animal)) {
      throw new Error('not new 调用');
    }
  }
  // 给原型上定义方法 say eat
  defineProperty(Animal.prototype, [
    {
      key: 'say',
      value: function () {
        console.log('say');
      },
    },
    {
      key: 'eat',
      value: function () {
        console.log('eat');
      },
    },
  ]);

  return Animal;
})();

// function Animal() {
//   this.name = 'zd'
// }
// Animal.prototype.say = function(){

// }
let animal = new Animal();
console.log(animal, Animal.prototype);

// new Animal();
// Animal();
