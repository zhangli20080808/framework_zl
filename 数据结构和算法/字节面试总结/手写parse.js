let obj = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3],
  e: [{ f: [4, 5, 6] }],
};
let r1 = parse(obj, 'a');
let r2 = parse(obj, 'b.c');
let r3 = parse(obj, 'd[2]');
let r4 = parse(obj, 'e[0].f[0]');
// 解法一
function parse(obj, str) {
  return new Function('obj', `return obj.${str}`)(obj);
}
// 解法二
 