let arr = [8, 11, 2, 78, 5, 1, 6, 12, 22]
/*
*
* 思考？  时间复杂度  n^2  稳定
*
* 大概就是先找一个标志位，先遍历一次，所以个头比他矮的，都站左边 比他高的，都占右边
* 遍历一次  就把数组分成2部分然后遍历 两边的数组 递归执行相同的逻辑
*
* */


//空间复杂度差一点 这个版本不是最优解 有个 left 和 right 空间的额外占用

function KP(arr) {
    if (arr.length < 1) {
        return arr
    }
    let left = []
    let right = []
    let flag = arr.shift()
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < flag) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return KP(left).concat(flag, KP(right))
}

console.log(KP(arr))