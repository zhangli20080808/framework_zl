/**
 *
 * @param {*} n
 */
function climbStairs(n) {
  if (n < 2) return 1;
  // const db = [1, 1];
  // for (let i = 2; i <= n; i += 1) {
  //   db[i] = db[i - 1] + db[i - 2];
  // }
  // return db[n];
  // 优化，其实没有必要用数组来记录 之前历史的 值
  let db0 = 1;
  let db1 = 1;
  //用 db0  db1  代表数组倒数两个数字
  // 倒数第二个数赋值为倒数第一个数字
  for (let i = 2; i <= n; i += 1) {
    let temp = db0;
    db0 = db1;
    db1 = db1 + temp;
  }
  //  返回数组的最后一位
  return db1;
}
