// 用es5 来模拟 es6的类 判断当前这个调用方式是不是通过new来调用的
// es6的类原型是不可枚举的
function define(target, protoProperties) {
  for (let i = 0; i < protoProperties.length; i++) {
    const prototype = protoProperties[i];
    Object.defineProperty(target, prototype.key, {
      configurable: true,
      enumerable: false, // 不可枚举

      ...prototype,
    });
  }
}
function defineProperty(Constructor, protoProperties, staticProperties) {
  if (Array.isArray(protoProperties)) {
    define(Constructor.prototype, protoProperties);
  }
  if (Array.isArray(staticProperties)) {
    define(Constructor, protoProperties);
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
  defineProperty(
    Animal.prototype,
    [
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
    ],
    [
      // 描述类上的静态属性
      {
        key: 'a',
        value: function () {
          return 123;
        },
      },
      {
        key: 'b',
        value: function () {
          return 456;
        },
      },
    ]
  );

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
