import pstree from 'pstree.remy'

export function getSubProcess(pid, cb) {
  pstree(pid, (err, pids) => {
    if(err) {
      console.log(`pstree error: ${err}`)
      return false
    }
    cb(pids)
  })
}