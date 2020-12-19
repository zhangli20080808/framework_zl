const Promise = require('./promise')
let promise = new Promise((resolve,reject)=>{
  resolve()
})


let promise2 = promise.then(()=>{
  return promise2
})

promise2.then(()=>{

},(err)=>{
  console.log(err)
})