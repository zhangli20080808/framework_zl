let arr = [8, 11, 2, 78, 5, 1, 6, 12, 22]
/*
*
* 思考？  时间复杂度  n^2  稳定
*
[8, 11, 2, 78, 5, 1, 6, 12, 22]

8

11, 4, 3, 2, 1, 9, 6, 0
|                     |
    0             11
                6  9
最后把  8 和6 调换一下位置
首先把8拿出来  分别从两边向中间遍历  两个游标
从右往左  如果找到一个比8小的 遍历停止
从左往右  如果找到一个比8大的 遍历停止
交换位置

* */
