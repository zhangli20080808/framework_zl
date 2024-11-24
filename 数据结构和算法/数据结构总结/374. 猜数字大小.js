function guess() {}
/**
 * 分而治之
 * @param {*} n
 */
function guessNum(n) {
  const rec = (low, high) => {
    if (low > high) return;
    // 拿到中间值
    const mid = Math.floor((high + low) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      return rec(mid + 1, high);
    } else {
      return rec(1, mid - 1);
    }
  };
  rec(1, n);
}
