// 邮政编码
/\d{6}/

// 小写英文字母
/^[a-z]+$/

// 英文字母
/^[a-zA-Z]+$/

// 日期格式 2019.12.1
/^\d{4}-\d{1,2}-\d{1,2}$/
// 用户名
/^[a-zA-Z]\w{5, 17}$/

// 简单的 IP 地址匹配
/\d+\.\d+\.\d+\.\d+/

//比如 以字母开头 后面字母数字下划线长度 6-30

const reg = /^[a-zA-Z]\w{5,29}$/

//{}  大于等于5  小玉等于29

function Compose (...args) {
  return args.reduce((right, left) => left(right))
}