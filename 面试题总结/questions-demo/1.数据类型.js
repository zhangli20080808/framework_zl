// let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
// console.log(result);

// console.log([] == false);
// // 0==0   true
// console.log(![] == false);
// ![] 先转换为布尔值在取反 
// // false == false  true

/*
 * JS中的数据类型
 *   1.基本数据类型
 *     number string boolean null undefined symbol bigint
 *   2.引用数据类型
 *     object function
 */

/*
 * 把其他数据类型转换为Number类型
 *     1.特定需要转换为Number的
 *       + Number([val])
 *       + parseInt/parseFloat([val])
 *     2.隐式转换（浏览器内部默认要先转换为Number在进行计算的）
 *       + isNaN([val])
 *       + 数学运算（特殊情况：+在出现字符串的情况下不是数学运算，是字符串拼接）
 *       + 在==比较的时候，有些值需要转换为数字再进行比较
 *       + ...
 *     .......
 */

/*
 * 把其它数据类型转换为字符串
 *    1. 能使用的办法
 *      + toString()
 *      + String()
 *    2. 隐式转换（一般都是调用其toString）
 *      + 加号运算的时候，如果某一边出现字符串，则是字符串拼接
 *      + 把对象转换为数字，需要先toString()转换为字符串，再去转换为数字
 *      + 基于alert/confirm/prompt/document.write...这些方式输出内容，都是把内容先转换为字符串，然后再输出的
 *      + ...
 *    ......
 */

/*
 * 在==比较的过程中，数据转换的规则：
 *  【类型一样的几个特殊点】
 *     {}=={}：false  对象比较的是堆内存的地址
 *     []==[]：false
 *     NaN==NaN：false
 *  【类型不一样的转换规则】
 *     1. null==undefined：true，但是换成===结果是false（因为类型不一致），剩下null/undefined和其它任何数据类型值都不相等
 *     2. 字符串==对象  要把对象转换为字符串
 *     3. 剩下如果==两边数据类型不一致，都是需要转换为数字再进行比较
 */

/*
 * 把其它数据类型转换为布尔
 *    1. 基于以下方式可以把其它数据类型转换为布尔
 *      + ! 转换为布尔值后取反
 *      + !! 转换为布尔类型
 *      + Boolean([val])
 *    2. 隐式转换
 *      + 在循环或者条件判断中，条件处理的结果就是布尔类型值
 *      + ...
 * 
 * 规则：只有 ‘0、NaN、null、undefined、空字符串’ 五个值会变为布尔的FALSE，其余都是TRUE
 */

// 对象转换为字符串：valueOf() toString()
// a.toString  //=> Object.prototype.toString() 检测数据类型的
/* 
var a = {
	i: 0,
	toString() {
		return ++this.i;
	}
};
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
}
*/

/* 
var i = 0;
Object.defineProperty(window, 'a', {
	get() {
		return ++i;
	}
});
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
} 
*/

let arr = [10.18, 0, 10, 25, 23]
arr = arr.map(parseInt)
console.log(arr)

// arr.map((item,index) => {});
/*
 * parseInt('10.18',0)
 *   =>10
 * parseInt(0,1)
 *   =>NaN
 * parseInt('10',2)
 *   =>看做二进制  '10'  在把它转换为十进制
 *   =>0*2^0 + 1*2^1 => 0 + 2 => 2
 * parseInt('25',3)
 *   =>看做三进制 '2'
 *   =>2*3^0 => 2
 * parseInt('23',4)
 *   =>看做四进制 '23'
 *   =>3*4^0 + 2*4^1 = 3 + 8 =>11
 * parseInt([value]) 把value转换为数字（内核机制：需要把value先变为字符串，然后从字符串左侧第一个字符查找，把找到的有效数字字符转换为数字，直到遇到一个非有效数字字符为止）
 * parseInt([value],[n]) 把[value]看做[n]进制的数据，最后转换为十进制
 *    [n]不写：默认是10，特殊情况字符串是以0X开头，默认值是16进制
 *    [n]范围 2~36之间  不在这个之间的  除了0和10一样,剩下结果都是NaN
 */