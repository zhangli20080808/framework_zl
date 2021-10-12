// export导出的是一个接口,不能导出一个值
//  let a = 1;
//  let b = 2;  // {a,b}

 // 这个变量如果更新 外面通过这个接口获取的值也会随之更新
//  setInterval(() => {
//     a++;
//  }, 1000);
//  let e = 'hello';
//  export {  //{c,b,default}
//      a as c,
//      b,
//      e as default // 给导出的对象增加了一个default属性
//  }
//  export default 'hello'; // 导出hello这个值
// import {a,b} from './b';
export function q(){}
export {a,b} from './b'; // 从某个模块中引入并且导出变量


// 如果遇到export default / import xxx from './xxx';
// export {a,b}  / import {a,b} - import * as obj
// 如果需要改名 就用as
// 如果使用 export + from 不能将导入的变量在当前的模块下使用