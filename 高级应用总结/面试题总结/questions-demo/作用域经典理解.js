/* var x = 1;
function func(x, y = function anonymous1() {x = 2}) {
    x = 3;
    y();
    console.log(x);
}
func(5);
console.log(x); */

/*
 * ES6中存在块级作用域（只要{} [除对象之外的大括号] 出现let/const/function）
 * 
 * 有一种情况也会产生
 *    1.函数有形参赋值了默认值
 *    2.函数体中有单独声明过某个变量
 * 这样在函数运行的时候，会产生两个上下文
 *    第一个：函数执行形成的私有上下文 EC(FUNC)  =>作用域链/形参赋值/....
 *    第二个：函数体大括号包起来的是一个块级上下文 EC(BLOCK)
 */

/*
 * EC(G)
 *   x = 1
 *   func = AAAFFF000 
 */
debugger;
var x = 1

function func (x, y = function anonymous1 () {x = 2}) {
  /*
   * EC(FUNC)私有上下文
   *    作用域链:<EC(FUNC),EC(G)>
   *    x=5  (2)
   *    y=anonymous1   [[scope]]:EC(FUNC)
   *
   * EC(BLOCK) 块级上下文 （上级上下文 EC(FUNC)）
   *    变量提升：var x;
   *    在代码没有执行之前，我们会把EC(FUNC)中的值也给他一份  x=5  (3)
   */
  var x = 3   //=>跨级上下文中的x  x=3
  y() //=>不是块级的y，向上级找， EC(FUNC)
  // anonymous1执行
  // 私有的上下文EC(AN)  作用域链:<EC(AN),EC(FUNC)>
  // x=2 修改的是EC(FUNC)中的2
  console.log(x)  //=>3
}

func(5)
console.log(x) //=>1