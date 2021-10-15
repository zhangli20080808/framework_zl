/*
 * forEach中不能使用continue和break
 * */

//forEach中使用return语句的作用只能跳出当前循环，并不能跳出整个循环。
arr.forEach((a, i) => {
  if (i === 2) {
    return;
  }
  console.log('forEach===return', a);
});
// 如果需要跳出整个循环，需要throw抛异常，如下
try {
  arr.forEach((a, i) => {
    if (i === 2) {
      throw new Error();
    }
    console.log('forEach===throw', a);
  });
} catch (e) {
  console.log(e);
}
