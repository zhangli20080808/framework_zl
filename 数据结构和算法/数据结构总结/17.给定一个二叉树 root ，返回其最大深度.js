// 给定一个二叉树 root ，返回其最大深度。

const createPromise = async (p) => {
  return p;
};
const p1 = createPromise(100);
const p2 = createPromise(200);
const p3 = createPromise(300);
const list = [p1, p2, p3];
// Promise.all(list).then((res) => {
//   console.log(res);
// });
for await (let res of list) {
  console.log(res);
}
