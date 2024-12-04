/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 将版本号按点（.）分割成修订号数组。
比较两个数组对应位置的修订号。
如果一个数组较短，则将其剩余部分视为0。
根据比较结果返回1、-1或0。

 * 比较版本号
 * @param version1 string字符串
 * @param version2 string字符串
 * @return int整型
 */
function compare(version1, version2) {
  // write code here
  // 将版本号按点分割成修订号数组
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);

  // 获取较长的数组长度
  const maxLength = Math.max(v1.length, v2.length);

  // 比较每个修订号
  for (let i = 0; i < maxLength; i++) {
    // 如果一个数组较短，则将其剩余部分视为0
    const num1 = i < v1.length ? v1[i] : 0;
    const num2 = i < v2.length ? v2[i] : 0;

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  // 如果所有修订号都相等，返回0
  return 0;
}
