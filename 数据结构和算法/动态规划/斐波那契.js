function fi(n) {
  // 我们考虑是不是可以用三个变量来存储
  let rn_2 = 0,
    rn_1 = 1,
    rn;
  for (let i = 2; i <= n; i++) {
    rn = rn_2 + rn_1; // 已经将结果给好了
    rn_2 = rn_1; // 然后需要往前 缩
    rn_1 = rn;
  }
  return rn;
}
