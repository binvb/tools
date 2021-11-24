import { parentPort } from 'worker_threads'

parentPort?.on('message', (cb) => {
  try {
    let _cb = eval(cb)()
    let _result = _cb.fn(..._cb.args)

    parentPort?.postMessage(_result)
  } catch(err) {
    console.log(`handle message error: ${err}`)
  }
})