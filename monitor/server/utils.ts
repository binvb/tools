export function sleep(r:number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, r || 1000)
  })
}