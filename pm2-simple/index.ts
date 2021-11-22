import ChildProcess from 'child_process'

function startServer(serverInstances: number = 1) {
  for(let i = 0; i < serverInstances; i++) {

  }
}


function fork() {
  ChildProcess.fork('./app')
}