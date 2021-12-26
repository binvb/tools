function sleep() {
  setTimeout(() => {
    throw new Error("Whoops! setTimeout error")
  }, 3000)
  // return new Promise((resolve, reject) => {
  //   throw new Error("Whoops! Promise error")
  // })
}


function xhr() {
  const oReq = new XMLHttpRequest();
  const url = "http://www.example.org/example.txt"
  
  oReq.addEventListener("error", (err) => {
    console.log(err, url)
  });
  oReq.open("GET", url);
  oReq.send();
}

function fetchMethod() {
  const url = 'http://www.example.org/example.txt' 

  fetch(url, 
    { 
      method: 'GET',
      mode: 'cors',
      cache: 'default' 
    }
  ).then(data => {
    console.log(data)
  }).catch(err => {
    // 错误处理
    console.log(url, err)
  })
}

export {
  sleep,
  xhr,
  fetchMethod
}