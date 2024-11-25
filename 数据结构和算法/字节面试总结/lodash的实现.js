// 1. 对路径做处理
// path 中也可能是数组的路径，全部转化成 . 运算符并组成数组
// 2. 读取对象属性 object(res)[p]

function get(object, path, defaultValue = 'undefined') {
  //构造数组,将'['和']'替换成'.'
  let newPath = [];
  newPath = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  // const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  return (
    newPath.reduce((a, b) => {
      return (a || {})[b];
    }, object) || defaultValue
  );
}
//测试
const obj = {
  a: {
    b: [
      {
        c: 1,
      },
    ],
  },
};
console.log(get(obj, 'a.b[0].c[1].e[2][1].e', 0));

console.log(get(obj, 'a.b[0].c', 0));

console.log(get(obj, 'a.b.c', 0));

console.log(get(obj, 'a', 0));

// 用法
// get({ a: null }, 'a.b.c', 3);
// // output: 3

// get({ a: undefined }, 'a', 3);
// // output: 3

// get({ a: null }, 'a', 3);
// // output: 3

// get({ a: [{ b: 1 }] }, 'a[0].b', 3);
// // output: 1
