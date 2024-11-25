/**
 * 排序算法
 * 将无序状态的一系列数据转化为有序的状态
 * 数字顺序
 * 字典顺序
 * 拼音顺序
 * 
 * 用途 - 数据的展示 分析
 * 
 * 复杂度分类
 * O(n^2) - 插入排序，比较排序，冒泡排序
 * O(nlgn) - 合并排序，快排，分块排序
 * 
 * 原地 - 插入 比较 冒泡 快速
 * 非原地排序 - 合并排序，桶排序，分块排序，基数排序 创建新数组，拷贝元素
 * 
 * 

  如果写成  length的话 ，[j+1] 数组的下标都 溢出了
  只需要循环到 倒数第二位，倒数第一位可以通过+1 实现
 */
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i += 1) {
    for (let j = 0; j < this.length - 1 - i; j += 1) {
      // -i 是因为 继续冒泡前面的区间就好了
      // console.log(this[j], this[j + 1]); // 所有
      if (this[j] > this[j + 1]) {
        const temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
};
const arr = [5, 4, 3, 2, 1];
arr.bubbleSort();
