let arr = [11, 2, 78, 5, 1, 6, 12, 22]
// 插入  在一个已经排好序的数组中插入一个元素，让他依然是有序的
/*
*
* 思考？  时间复杂度  n^2  稳定
*
* 我们挨个去遍历  我新的一个值插入到左边的数组里面 左边的数组是有序的 插入进来依然是有序的
*
* */

function InsertSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            //后面的跟前面的比较 后面的值小于前面的值得时候 我们把后面的值扔到前面 11 2
            if (arr[j] < arr[j - 1]) {
                console.log(arr[j], arr[j - 1]);
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
                console.log(arr,'arr')
            } else {
                break
            }
        }
    }
    return arr

}

console.log(InsertSort(arr))
