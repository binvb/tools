import cluster from "cluster"
import { cpus } from "os"
import { sleep } from "./utils"

const numCPUs = cpus().length

if (cluster.isMaster || cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  console.log(`main processs pid: ${process.pid}`)
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = require('./app.ts')
  console.log(`child processs pid: ${process.pid}`)
}

// restart all
function restart() {
  eachWorker((workder:any) => {
    workder.emit('disconnect')
    sleep(10000)
    workder.kill()
    cluster.fork()
  })
}

// kill all
function killALl() {
  eachWorker((workder:any) => {
    workder.kill()
  })
  setTimeout(() => {
    process.exit()
  }, 1000)
}

// each workder
function eachWorker(callback: Function) {
  for (const id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}