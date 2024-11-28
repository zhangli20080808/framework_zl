let arr = [8, 11, 2, 78, 5, 1, 6, 12, 22];
/*
 * 搜索排序 都是基础问题
 * 排序算法 ：如何把一个数组变成有序的

 * 思考？  时间复杂度  n^2  稳定
 *
 * 大概就是先找一个标志位，先遍历一次，所以个头比他矮的，都站左边 比他高的，都占右边
 * 遍历一次  就把数组分成2部分然后遍历 两边的数组 递归执行相同的逻辑
 *
 * */

//空间复杂度差一点 这个版本不是最优解 有个 left 和 right 空间的额外占用

function KP(arr) {
  if (arr.length < 1) {
    return arr;
  }
  let left = [];
  let right = [];
  let flag = arr.shift();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return KP(left).concat(flag, KP(right));
}

function findA(arr) {
  const res = {
    chart: '',
    length: 0,
  };
  let i = 0;
  let j = 0;
  let maxLength = 0;
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (arr[i] === arr[j]) {
      maxLength++;
    }
    if (arr[i] !== arr[j] || i === length - 1) {
      if (maxLength > res.length) {
        res.chart = arr[i];
        res.length = maxLength;
      }
      maxLength = 0;
      j = i;
      i--;
    }
  }
}

function find(max) {
  if (max <= 0) return res;
  for (let i = 0; i <= max; i++) {
    let s = i.toString();
    const length = s.length;
    // 比较头尾字符串
    let flag = false;
    let startIndex = 0;
    let endIndex = length - 1;
    while (startIndex < endIndex) {
      if (s[startIndex] === s[endIndex]) {
        flag = true;
        break;
      } else {
        // 不相等 继续比较
        startIndex++;
        endIndex--;
      }
    }
    if (flag) res.push(i);
  }
}

console.log(KP(arr));
