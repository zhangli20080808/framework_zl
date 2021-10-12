// es6的模块 浏览器用
// 常见的模块 commonjs规范  es6module
// es6模块静态模块 只能在顶级作用域

// 模块系统中 每个文件都是一个模块 ，模块之间都是相互独立的
// export 导出的语法  import 导入的语法
// import 语法可以有声明的作用，有var的特点，可以实现变量提升，但是不能更改变量对应的值
// as可以更改名字 更改导出的名字
// 1)
// import {c as a,b} from './a';
// import * as obj from './a'; // 把所有的属性都放到obj对象中
// 2)
// setInterval(()=>{
//     console.log(obj.c);
// },1000)
// import xxx from './a';
// import _,{c,b,default as e} from './a';
// console.log(e,_,xxx);

import * as obj from './a';
console.log(obj);


