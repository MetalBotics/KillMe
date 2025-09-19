import { startServer } from './index.js';

startServer({ port: 5000 });

// Keep process alive; server returned by startServer already listens and
// prevents process exit. This file exists to be a clean entrypoint for
// nodemon/node --loader ts-node/esm.
