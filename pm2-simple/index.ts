import ChildProcess from 'child_process'
import { SubProcessArgs } from './index.d'

// all start, default port 3000 + i
function startServer(serverInstances: number = 1) {
  for(let i = 0; i < serverInstances; i++) {
    fork({
      port: 3000 + i
    })
  }
}

// hot reload
function hotReload() {
  
}

// stop all

function fork(args:SubProcessArgs) {
  ChildProcess.fork('./app', [args.port.toString()])
}