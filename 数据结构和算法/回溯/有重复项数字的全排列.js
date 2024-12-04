/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param num int整型一维数组
 * @return int整型二维数组
 * 循环：遍历数组中的每个元素。
去重条件：如果当前元素已经被使用过，或者当前元素与前一个元素相同且前一个元素没有被使用过，则跳过当前元素。
递归调用：将当前元素加入路径，并标记为已使用，然后递归调用回溯函数。
回退：递归调用结束后，将当前元素从路径中移除，并标记为未使用。
 */
function permuteUnique(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b); // 先排序，方便后续去重

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 去重条件：如果当前数字和前一个数字相同，并且前一个数字还没有被使用过，则跳过
      if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) {
        continue;
      }

      path.push(nums[i]);
      used[i] = true;
      backtrack(path);
      used[i] = false;
      path.pop();
    }
  }

  backtrack([]);
  return result;
}

// 示例用法
const nums = [1, 1, 2];
const permutations = permuteUnique(nums);
console.log(permutations);
// 输出: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
