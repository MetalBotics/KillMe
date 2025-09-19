import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';

let server: any;

export interface KillMeOptions {
  port?: number;
  host?: string;
}

// Start the server and return the express app
export function startServer(options: KillMeOptions = {}) {
  const app = express();
  const port = options.port ?? 5000;
  const host = options.host ?? '0.0.0.0';

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('KillMe API running!');
  });

  app.get('/kill/:time', (req, res) => {
    let time: string | number = req.params.time;
    if (typeof time === 'string' && time.endsWith('min')) {
      time = parseInt(time.replace('min', ''));
      time = (time as number) * 60;
    }
    if (!isNaN(time as number)) {
      res.status(200).json({ message: `Kill command executed, PC will shut down in ${time} seconds` });
      exec(`shutdown -f -s -t ${time}`);
    } else {
      res.status(400).json({ message: 'Invalid time parameter' });
    }
    console.log(time);
  });

  app.get('/mercy', (req, res) => {
    exec('shutdown -a');
    res.status(200).json({ message: 'Mercy command executed' });
  });

  server = app.listen(port, host, () => {
    console.log(`KillMe server running at http://${host}:${port}`);
  });

  return { app, server };
}

export function stopServer() {
  if (server) {
    server.close();
    server = undefined;
    return true;
  }
  return false;
}
