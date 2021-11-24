function myFn() {
  let i = [1,2,3,4,5]
  for(let j = 0; j < i.length; j += 1) {
    if(j === 3) {
      return j
    }
  }
  console.log(i)
}

let vb = myFn()
console.log(vb)