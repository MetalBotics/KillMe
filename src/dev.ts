import KillMe from './index.js';
import { KillMeConfig } from './index.js';

const opt: KillMeConfig = {port:5000, host:"0.0.0.0"}

const kserver = new KillMe(opt)
kserver.startServer()

// Keep process alive; server returned by startServer already listens and
// prevents process exit. This file exists to be a clean entrypoint for
// nodemon/node --loader ts-node/esm.
