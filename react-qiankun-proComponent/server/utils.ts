let consfig = {
  period: 300
}


function sleep () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, consfig.period)
  })
}

function changePeriod() {
  consfig.period = 1000
}

module.exports = {
  sleep,
  changePeriod
}