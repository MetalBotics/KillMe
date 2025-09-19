import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';

export interface KillMeConfig {
  port?: number;
  host?: string;
}

export default class KillMe {
  private static config: KillMeConfig
  private static server: any
  private static isRunning: boolean

  constructor(config: KillMeConfig) {
    KillMe.config = config
  }
  // Start the server and return the express app
  startServer() {
    if(!KillMe.isRunning) {
      KillMe.isRunning = true
      const app = express();
      const port = KillMe.config.port ?? 5000;
      const host = KillMe.config.host ?? '0.0.0.0';

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

      KillMe.server = app.listen(port, host, () => {
        console.log(`KillMe server running at http://${host}:${port}`);
      });

      return { app, server: KillMe.server };
    } else {
      throw new Error("KillMe server already running!")
    }
  }

  stopServer() {
    if (KillMe.server && KillMe.isRunning) {
      KillMe.server.close();
      KillMe.server = undefined;
      KillMe.isRunning = false
      return true;
    }
    return false;
  }
}