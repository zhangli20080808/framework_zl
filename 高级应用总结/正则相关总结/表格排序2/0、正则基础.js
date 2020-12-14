/*
* 正则  他就是一个规则 用来出来字符串的规则 就是用来处理字符串的
* 1. 匹配: 判断一个字符串是否符合我们制定的规则  test方法实现
* 2. 捕获: 把字符串中符合我们正则规则的内容捕获到  exec 方法实现
* 3. 如果创建一个正则
* */

// const reg = /\d/; //包含0-9之前的数字
// const reg = /\d/;

// console.log(reg.test('张力'))  // false
// console.log(reg.test('123'))  //true
// console.log(reg.test('张力123123'))  //true

// console.log(reg.exec('张力'))  // null
// console.log(reg.exec('1'))  //[ '1', index: 0, input: '1', groups: undefined ]

//创建正则  1.字面量 2.实例
let regs = /\d/
let reg = new RegExp("")

//正则的两种创建方式是有区别的  如何学习正则
// console.log(RegExp.prototype)


