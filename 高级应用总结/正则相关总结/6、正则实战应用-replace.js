//1、replace是字符串替换的方法
//    var str = "小明JS培训,小明NODE培训";
//    str = str.replace("小明", "@");//->在不使用正则的情况下,执行一次只能替换一个
//    console.log(str);//->"@JS培训,小明NODE培训"
//    str = str.replace("小明", "@");
//    console.log(str);//->"@JS培训,@NODE培训"

//->不使用正则的情况下,执行多次不一定能解决问题  没有全部替换
//    var str = "小明JS培训,小明NODE培训";//->"小明"->"小明培训"
//    str = str.replace("小明", "小明培训");
//    console.log(str);//->"小明培训JS培训,小明NODE培训"
//    str = str.replace("小明", "小明培训");
//    console.log(str);//->"小明培训培训JS培训,小明NODE培训"

//->replace天生为正则而生
//    var str = "小明JS培训,小明NODE培训";
//    str = str.replace(/小明/g, "小明培训");
//    console.log(str);//->"小明培训JS培训,小明培训NODE培训"


//->replace的原理:
//第一个参数:正则
//第二个参数:匿名函数A

//->正则和字符串进行匹配,匹配到几次,我们的A就执行几次  传递和我们exec结果捕获到的一样的值
//->每一次执行A的时候,都有一些参数传递进来(传递进来的参数值和每一次使用exec捕获到的结果是一模一样的)
// :包含了大正则捕获的内容(如果有分组,也有分组捕获的内容)、大正则捕获的开始索引的位置、捕获的原始字符串
//->在A中的每一次return后面的返回值,都是把当前大正则捕获的内容进行替换,return的是啥,相当于把大正则捕获的替换成啥


// var str = "小明JS培训,小明NODE培训,小明HTML5培训";
// // let regs = /小明/g
// // console.log(regs.exec(str))  //   index: 0
// // console.log(regs.exec(str))  // index: 7,
// str = str.replace(/小明/g, function () {
//     console.log(arguments) // { '0': '小明', '1': 0, '2': '小明JS培训,小明NODE培训,小明HTML5培训' }
//     return "小明培训";
// });
// console.log(str);

//2、
//    var str = "123678";//->"壹贰叁陆柒捌"
//    var ary = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
//    str = str.replace(/\d/g, function () {
//        // console.log(arguments[0]);//->每一次捕获到的内容(我们要的数字)
//        return ary[arguments[0]];
//    });
//    console.log(str);


//3、格式化时间字符串
//    var str = "2016-04-03";//->"2016年04月03日"
//    var reg = /^(\d{4})-(\d{2})-(\d{2})$/g;
//    str = str.replace(reg, function () {
//        //->执行一次:arguments[n]第n个分组捕获的内容
//        return arguments[1] + "年" + arguments[2] + "月" + arguments[3] + "日";
//    });
//    console.log(str);

//    var str = "2016-04-03";//->"2016年04月03日"
//    var reg = /^(\d{4})-(\d{2})-(\d{2})$/g;
//    str = str.replace(reg, "$1年$2月$3日");
//    console.log(str);


//4、模板引擎实现的原理

//分组捕获
// 在正则捕获的时候 我们添加分组 不仅仅可以把大正则匹配的内容捕获 还可以把小分组代表的子正则匹配的
// 内容一起捕获出来  如果我只想让他改变优先级 不想让他捕获 ?: 在分组中的第一个位置
var ary = ["赵爽", "18", "china", "javascript"];
var str = "my name is {0}，my age is {1}，i com from {2}，i can do {3}~~";
str = str.replace(/\{(\d+)\}/g, function () {
    console.log(/\{(?:\d+)\}/g.exec(str))  // ['{0}','0',index: 11]
    console.log(/\{(\d+)\}/g.exec(str))  // ['{0}',index: 11]
    return ary[arguments[1]];
});
console.log(str);

// let str = 'zhufeng2015zhufeng2016'
// let reg = /(\d+)/g;
// str = str.replace(reg, function () {
//     // console.log(arguments,1) // 获取每一个匿名函数执行我们正则捕获到的第一个分组中的内容
//     console.log(RegExp.$1)
// //    RegExp.$1 获取第一个分组捕获的内容
// })
// // console.log(str)

