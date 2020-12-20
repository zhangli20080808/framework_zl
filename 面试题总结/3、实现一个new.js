function _new (fn, ...arg) {
  const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, arg)
  return ret instanceof Object ? ret : obj
}

// 实现⼀个new
var Dog = function (name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('wangwang')
}
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name)
}
let sanmao = new Dog('三⽑')
let simao = _new(Dog, '四⽑')

sanmao.sayName()
simao.sayName()