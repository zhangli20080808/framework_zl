// 1-10 十个数字乱序随机排列，其中某个数字写错了，请找出其中重复和缺少的数字，例如
const arr = [10, 6, 1, 3, 2, 5, 4, 6, 9, 8];
function solution(arr) {
  let miss, dup;
  // TODO
  const obj = {};
  arr.forEach((item) => {
    if (obj[item]) {
      obj[item] = ++obj[item];
    } else {
      obj[item] = 1;
    }
  });
  for (let i = 1; i < 11; i++) {
    if (obj[i] === undefined) miss = i;
    if (obj[i] === 2) dup = i;
  }
  return [miss, dup];
}
console.log(solution(arr)); // [6, 7]
