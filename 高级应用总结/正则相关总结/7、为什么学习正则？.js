/*
*
*
* 查找 替换 验证 分割
* */

let str = 'asd111gsdgsdg456gsdgsdg222gsgsdg677'
// [111,456] 目标

//传统方式
function getNum (str) {
  let arr = []
  let temp = ''
  //如果是数字 保存起来  不是 追加
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      temp += str[i]
    } else {
      if (temp !== '') {
        arr.push(parseInt(temp))
        temp = ''
      }
    }
  }
  if (temp !== '') {
    arr.push(parseInt(temp))
  }

  return arr

}

let arr1 = getNum(str)

//正则方式
let reg = /\d+/g
let arr = str.match(reg)
console.log(arr1, arr)