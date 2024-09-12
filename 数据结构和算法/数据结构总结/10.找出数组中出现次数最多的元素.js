// 找出数组中出现次数最多的元素,以及出现的次数
function more(arr) {
  let max = null; // 定义一个用来存储出现次数最多的元素
  let num = 1; // 定义一个用来存储出现最多的次数
  arr.reduce((p, k) => {
    p[k] ? p[k]++ : (p[k] = 1);
    if (p[k] > num) {
      num = p[k];
      max = k;
    }
    return p;
  }, {});
  // const obj = {};
  // arr.forEach((item) => {
  //   if (!obj[item]) {
  //     obj[item] = 1;
  //   } else {
  //     obj[item]++;
  //   }
  //   if (obj[item] > num) {
  //     num = obj[item];
  //     max = item;
  //   }
  // });
  return {
    max,
    num,
  };
}
