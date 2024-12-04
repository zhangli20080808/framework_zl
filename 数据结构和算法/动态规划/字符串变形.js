/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param s string字符串
 * @param n int整型
 * @return string字符串
 */
function trans(s, n) {
  // write code here
  // 步骤1：分割字符串
  const words = s.split(' ');

  // 步骤2：反转单词数组
  const reversedWords = words.reverse();
  console.log(reversedWords, 'reversedWords');

  // 步骤3：反转每个字符的大小写
  const transformedWords = reversedWords.map((word) => {
    return word
      .split('')
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join('');
  });

  // 步骤4：重新组合字符串
  return transformedWords.join(' ');
}
