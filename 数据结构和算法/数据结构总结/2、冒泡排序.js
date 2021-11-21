let arr = [11, 2, 78, 5, 1, 6, 12, 22];
// 冒泡  我们采用 挨个交换的逻辑

/*
 *
 * 思考？  时间复杂度
 *
 * 如果我们把 78 冒泡到最右边 这个算法是o(n) 我们外面报了一层循环 都和n相关 o(n^2)
 * 冒泡算法是否稳定呢？  稳定啊 因为 我只比较右边比我大的时候 我才操作
 * */
function bubleSort(arr) {
  for (let o = arr.length; o >= 2; o--) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }

  return arr;
}

bubleSort(arr);
console.log(arr);
