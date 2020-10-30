/** 删除数组中指定索引的数据 **/
Array.prototype.deleteAt = function (index) {
    if (index < 0) {
        return this;
    }
    return this.slice(0, index).concat(this.slice(index + 1, this.length));
}
/** 数组洗牌 **/
Array.prototype.random = function () {
    var tempArr = [], me = this, t;
    while (me.length > 0) {
        t = Math.floor(Math.random() * me.length);
        tempArr[tempArr.length] = me[t];
        me = me.deleteAt(t);
    }
    return tempArr;
}
Array.prototype.orderRandom = function () {
    return this.sort(function () {
        return Math.random() > 0.5 ? "-1" : "1";
    });
}
/** 数字数组排序 **/
Array.prototype.sortNum = function (i) {
    if (!i) {
        i = 0;
    }
    if (i == 1) {
        return this.sort(function (a, b) {
            return b - a;
        });
    }
    return this.sort(function (a, b) {
        return a - b;
    });
}
/** 获取数字数组中的最大项 **/
Array.prototype.getMax = function () {
    return this.sortNum(1)[0];
}
/** 获取数字数组中的最小项 **/
Array.prototype.getMin = function () {
    return this.sortNum(0)[0];
}
/** 数组第一次出现指定元素的位置 **/
Array.prototype.indexOf = function (o) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == o) {
            return i;
        }
    }
    return -1;
}
/** 去除数组中的重复项 **/
Array.prototype.arrUnique = function () {
    var reset = [], done = {};
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!done[temp]) {
            done[temp] = true;
            reset.push(temp);
        }
    }
    return reset;
}
 

