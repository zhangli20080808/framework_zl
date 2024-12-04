/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param numbers int整型一维数组
 * @return int整型
 */
function MoreThanHalfNum_Solution(nums) {
  // write code here
  const countMap = {};
  const n = nums.length;

  for (let num of nums) {
    if (countMap[num] === undefined) {
      countMap[num] = 1;
    } else {
      countMap[num]++;
    }

    if (countMap[num] > n / 2) {
      return num;
    }
  }

  return null; // 如果没有超过一半的数字，返回null
}
