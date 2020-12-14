


/*
 * 0-i取一个数 取一个索引 然后把这个索引对应的元素和我们的arr[i]做一个交换
 * 返回min 和max之间的一个随机数 包括max
 * 1.Math.random()   ->  返回的是一个0-1之间的一个小数
 * 2.Math.random()*(max-min+1) ->返回的是一个min max之间的一个数  +1 是为了取得上限的值
 * 3.要落在这之间 还要＋min  小数
 * 4.向下取整 Math.floor
 * */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

 function shuffle(arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i); //i - 80   j-40
        let t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t;
    }
    return _arr;
}