let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, 0)
  }))
})

p.then((data)=>{
  console.log(data)
})  