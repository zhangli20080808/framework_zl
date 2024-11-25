// 1. 第一轮从0 开始  第二轮从 i 开始(i代表论述)
// Array.prototype.selectionSort = function () {
//   for (let i = 0; i < this.length; i += 1) {
//     let indexMin = 0;
//     for (let j = i; j < this.length; j += 1) {
//       if (this[j] < this[indexMin]) {
//         indexMin = j;
//       }
//       // 交换位置
//       const temp = this[i];
//       this[i] = this[indexMin];
//       this[indexMin] = temp;
//     }
//   }
// };
function selectionSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    // 记录当前未排序部分中的最小元素的索引
    var minIndex = i;
    for (var j = i + 1; j < len; j++) {
      // 如果找到更小的元素，则更新最小元素的索引
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    } // 将找到的最小元素与未排序部分的第一个元素交换位置
    var temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
// 示例
var arr = [64, 25, 12, 22, 11];
console.log(selectionSort(arr)); // 输出：[11, 12, 22, 25, 64]
