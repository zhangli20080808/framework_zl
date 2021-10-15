// // 传统方式  ?abc=123&test=123
function query (name) {
  const res = {}
  const search = location.search.substr(1) // 类似 array.slice(1)
  // search: 'a=10&b=20&c=30'
  search.split('&').forEach(item => {
    const arr = item.split('=')
    const key = arr[0]
    const value = arr[1]
    res[key] = value
  })
  return res

function query(name) {
    const search = location.search.substr(1) // 类似 array.slice(1)
    // search: 'a=10&b=20&c=30'
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const res = search.match(reg)
    if (res === null) {
        return null
    }
    return res[2]
}
// query('d')

// URLSearchParams
function query (name) {
  const search = location.search
  const p = new URLSearchParams(search)
  return p.get(name)
}

console.log(query('b'))
