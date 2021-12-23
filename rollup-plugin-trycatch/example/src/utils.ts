function sleep() {
  console.log(111111)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export {
  sleep
}