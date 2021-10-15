// let a = { n: 1 }
// let b = a
// a.x = a = { n: 2 }
// console.log(a.x)
// console.log(b)

//所有变量 先创建值  a=b=10  a=10 b=10

/*
 *  变量提升 当遇到{}新老浏览器表现不一致 (兼容es3 es6)
 * 1.老版本浏览器<=10  不管 {} 是fn声明加定义，也不存在块级作用域  21 21
 * 2.新版本浏览器
 *   遇到{}中的fn,在全局下只申明，不定义
 *   如果{}出现fn var let创建一个块级上下文 按顺序 不要记优先级
 *
 * */
var a = 0;
if (true) {
  a = 1;

  function a() {}
  a = 21;
  console.log(a);
}
console.log(a);
