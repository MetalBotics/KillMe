import KillMe from './index.js';
import { KillMeConfig } from './index.js';

const opt: KillMeConfig = {port:5000, host:"0.0.0.0"}

const kserver = new KillMe(opt)
kserver.startServer()