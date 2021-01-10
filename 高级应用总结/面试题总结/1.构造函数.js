function Foo () {
  Foo.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}

// 以上只是 Foo 的构建⽅法，没有产⽣实例，此刻也没有执⾏
Foo.prototype.a = function () {
  console.log(3)
}
// 现在在 Foo 上挂载了原型⽅法 a ，⽅法输出值为 3
Foo.a = function () {
  console.log(4)
}
// 现在在 Foo 上挂载了直接⽅法 a ，输出值为 4
Foo.a()
// ⽴刻执⾏了 Foo 上的 a ⽅法，也就是刚刚定义的，所以
// # 输出 4
let obj = new Foo()
/* 这⾥调⽤了 Foo 的构建⽅法。Foo 的构建⽅法主要做了两件事：
1. 将全局的 Foo 上的直接⽅法 a 替换为⼀个输出 1 的⽅法。
2. 在新对象上挂载直接⽅法 a ，输出值为 2。
*/
obj.a()
// 因为有直接⽅法 a ，不需要去访问原型链，所以使⽤的是构建⽅法⾥所定义的 this.a，
// # 输出 2
Foo.a()
// 构建⽅法⾥已经替换了全局 Foo 上的 a ⽅法，所以
// # 输出 1

// 数组扁平化+去重+排序
let arr = [1, 11, 23, 12, 4]
const result = Array.from(new Set(arr.flat(Infinity).sort((a, b) => {
  return a - b
})))
console.log(result) //[ 1, 4, 11, 12, 23 ]
