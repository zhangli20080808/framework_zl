/**
 *
 * @param {*} g  - 孩子数量和胃口值
 * @param {*} s  - 饼干数量
 */
const findCollectionCHildren = (g, s) => {
  const sortFn = (a, b) => a - b;
  g.sort(sortFn);
  s.sort(sortFn);
  let i;
  s.forEach((n) => {
    if (n > g[i]) {
      i += 1;
    }
  });
  return i;
};
