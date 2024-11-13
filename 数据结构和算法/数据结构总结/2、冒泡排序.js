let arr = [11, 2, 78, 5, 1, 6, 12, 22];
// 冒泡  我们采用 挨个交换的逻辑
// 重复的遍历要排序的数列，顺序错误就交换过来，一次遍历两个

/*
 *
 * 思考？  时间复杂度
 *
 * 如果我们把 78 冒泡到最右边 这个算法是o(n) 我们外面报了一层循环 都和n相关 o(n^2)
 * 每个人和右边人比较，如果你比他高，就交换位置，否则不动。因为是和右边的人比较，所以遍历到 n-1 就行
 * 冒泡算法是否稳定呢？  稳定啊 因为 我只比较右边比我大的时候 我才操作
 * */
function bubbleSort(arr) {
  for (let o = arr.length; o >= 2; o--) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }

  return arr;
}

bubbleSort(arr);
console.log(arr);

/**
 * 1. 外层循环控制所有需要遍历的次数
   2. 内层循环负责具体的比较和交换工作
   当某一趟遍历过程中没有进行任何交换，说明序列已经有序，此时可以直接结束算法

  双层for循环
   内层循环可以看做外层循环的语句
   内层循环执行的顺序也要遵循 for 循环的执行顺序
   外层循环执行一次，内层循环要执行全部次数

   内层循环负责干某个事情，外层循环控制着事情干多少次
   https://zhuanlan.zhihu.com/p/478297648
   
   for 循环可以重复执行某些相同代码
  for 循环可以重复执行些许不同的代码，因为我们有计数器
  for 循环可以重复执行某些操作，比如算术运算符加法操作
  随着需求增加，双重for循环可以做更多、更好看的效果
  双重 for 循环，外层循环一次，内层 for 循环全部执行
  for 循环是循环条件和数字直接相关的循环
  分析要比写代码更重要
  一些核心算法想不到，但是要学会，分析它执行过程
  举一反三，自己经常总结，做一些相似的案例

 * @param {*} arr 
 * @returns 
 */
function bubuleSort2(arr) {
  let len = arr.length - 1;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      // 相邻元素两两对比
      if (arr[j] > arr[j + 1]) {
        // const temp = arr[j + 1];
        // arr[j + 1] = arr[j];
        // arr[j] = temp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 示例
var arrs = [34, 8, 64, 51, 32, 21];
console.log(bubuleSort2(arrs)); // 输出：[8, 21, 32, 34, 51, 64]

// 上述算法在 数据比较少的时候 还可以，逻辑，简单粗暴。数据量很大，显然不行，需要优化，二分思想
// 给数组找一个标识位置，比如我，所有人都给我比个头，比我高的，站我右边，比我矮的，站我左边

function flatten(arr = []) {
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const p = flatten(item);
      res = res.concat(p);
    } else {
      res = res.concat(item);
    }
  });
  return res;
}
const arrList = [1, 2, 3, [4, 5, [10, 11]], [7, 8]];
console.log(flatten(arrList));

function getType(obj) {
  Array.prototype.slice.call(obj);
}
