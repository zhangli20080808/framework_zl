/**
栈- 那盘子一样，先进后出 队列-先进先出，排队打饭
 * 思路1，从末尾拿出来，再扔到头部去
   思路2，后末尾截取
 * @param {*} arr 
 * @param {*} k 不能是负数或者0
 */
function reverseK(arr, k) {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length);

  // O(n^2)
  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n != null) {
      arr.unshift(n); // 数组是一个有序结构，unshift 操作非常慢！！！ O(n)
    }
  }
  return arr;
}

/**
 * 1. 处理k 2. slice 截取 3. 合并 O(1)
 * @param {*} arr
 * @param {*} k
 */

function reverseK2(arr = [], k) {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length);

  const right = arr.slice(-step);
  const left = arr.slice(0, arr.length - step);
  const result = left.contact(right);
  return result;
}

// 测试

const arr = [1, 2, 3, 4, 5, 6];
const res = reverseK(arr, 3);
// 预期结果  [4,5,6,1,2,3]
console.log(res)
