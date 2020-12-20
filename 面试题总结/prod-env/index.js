const img1 = document.getElementById('img1')
img1.onload = function () {
  console.log('img loaded')
}

window.addEventListener('load', function () {
  console.log('window loaded')
})

document.addEventListener('DOMContentLoaded', function () {
  console.log('dom content loaded')
})

function test1 () {
  const nums = [1, 2, 3]
  nums.forEach(async x => {
    const res = await multi(x)
    console.log(res)
  })
}

test1()