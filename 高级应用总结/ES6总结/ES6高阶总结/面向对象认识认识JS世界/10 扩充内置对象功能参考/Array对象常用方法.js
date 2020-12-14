
    //shift:删除原数组的第一项，返回删除元素的值；如果数组为空则返回undefined
    var arr = [1, 2, 3, 4, 5];
    var out = arr.shift();
    console.log(arr); //[2,3,4,5]
    console.log(out); //1
    var arr = [];
    var out = arr.shift();
    console.log(arr); //[]
    console.log(out); //undefined


    //unshift:将参数添加到原数组开头，返回数组的长度(ie6下返回undefined)
    var arr = [1, 2];
    var out = arr.unshift(-1, 0);
    console.log(arr); //[-1,0,1,2]
    console.log(out); //4


    //pop:删除原数组的最后一项，返回数组删除的值；如果数组为空则返回undefined
    var arr = [1, 2, 3, 4, 5];
    var out = arr.pop();
    console.log(arr); //[1,2,3,4]
    console.log(out); //5
    var arr = [];
    var out = arr.pop();
    console.log(arr); //[]
    console.log(out); //undefined


    //push:将参数添加到原数组的末尾，返回数组的长度
    var arr = [1, 2, 3];
    var out = arr.push(4, 5, 6);
    console.log(arr); //[1,2,3,4,5,6]
    console.log(out); //6


    //concat:返回一个将参数添加到原数组中构成的新数组
    var arr = [1, 2, 3];
    var out = arr.concat(4, 5);
    console.log(arr); //[1,2,3]
    console.log(out); //[1,2,3,4,5]


    //splice(start,deleteCount,val1,val2,...):从start位置开始删除原数组deleteCount项，并从该位置起插入val1,val2,...，返回删除的项组成的新数组
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(2, 2, 7, 8, 9, 10);
    console.log(arr); //[1,2,7,8,9,10,5]
    console.log(out); //[3,4]
    //在清空数组时仅需传递start，如果不删除所有元素，再传递deleteCount
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(2);
    console.log(arr); //[1,2]
    console.log(out); //[3,4,5]
    //同shift
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(0, 1);
    console.log(arr); //[2,3,4,5]
    console.log(out); //[1]
    //同unshift
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(0, 0, 22, -1, 0);
    console.log(arr); //[22,-1,0,1,2,3,4,5]
    console.log(out); //[]
    //同pop
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(arr.length - 1, 1);
    console.log(arr); //[1,2,3,4]
    console.log(out); //[5]
    //同push
    var arr = [1, 2, 3, 4, 5];
    var out = arr.splice(arr.length, 0, 6, 7, 8);
    console.log(arr); //[1,2,3,4,5,6,7,8]
    console.log(out); //[]


    //reverse:将原数组倒序；
    var arr = ['a.text.json', 1, {}, [2, 3]];
    console.log(arr); //['a', 1, {}, [2, 3]]
    var out = arr.reverse();
    console.log(arr); //[[2,3],{},1,'a']
    console.log(out); //[[2,3],{},1,'a']
    var arr = [0, 1, 5, 10, 15];
    arr.reverse();
    console.log(arr); //[15,10,5,1,0]
    var arr = [1, 0, 5, 15, 10];
    arr.reverse();
    console.log(arr); //[10,15,5,0,1]


    //sort(orderfunction):sort()为升序排列，但是先调用每个数组项的toString()方法，然后比较字符串来排序，是按ASCII进行比较的；
    //所以跟reverse不同原理不同。sort()不带参数的时候是从字面上对数组排序
    var arr = [0, 1, 5, 10, 15];
    arr.sort();
    console.log(arr); //0,1,10,15,5 ,注意这里是字符串按ASCII进行比较的
    //调用这样的函数就按数值方式排列了
    function sortNumber(a, b) {
        return a - b
    }
    arr.sort(sortNumber);
    console.log(arr);   //0,1,5,10,15


    //slice(start,end):返回从原数组中指定start到end(不包含该元素)之间的项组成的新数组,如只有一个参数，则从start到数组末尾
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    var out = arr.slice(2,3);
    console.log(arr); //[1, 2, 3, 4, 5, 6, 7, 8]
    console.log(out); //[3]


    //join(separator):将数组的元素组成一个字符串，以separator为分隔符，省略的话则用默认用逗号为分隔符
    var arr = [1, 2, 3, 4, 5, 6];
    var out = arr.join();
    console.log(arr); //[1, 2, 3, 4, 5, 6]
    console.log(out); //1,2,3,4,5,6
    out = arr.join("");
    console.log(out); //123456
    out = arr.join("&");
    console.log(out); //1&2&3&4&5&6

