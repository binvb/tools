import { WorkerOptions, Worker } from 'worker_threads'

const workerTs = (file: string, wkOpts: WorkerOptions) => {
  wkOpts.eval = true;
  if (!wkOpts.workerData) {
      wkOpts.workerData = {};
  }
  wkOpts.workerData.__filename = file;
  return new Worker(`
          const wk = require('worker_threads');
          require('ts-node').register();
          let file = wk.workerData.__filename;
          delete wk.workerData.__filename;
          require(file);
      `,
      wkOpts
  );
}

export {
  workerTs
}