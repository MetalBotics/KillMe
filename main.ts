import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 5000;

// Simple API for turning the host PC off (Windows only)
// Do not expose this, use only in internal networks

app.get('/', (req, res) => {
  res.send('KillMe API running!');
});

app.post('/kill', (req, res) => {
  exec("shutdown -f -s -t 60")
  res.json({ message: 'Kill command executed' }).status(200);
});

app.post('/mercy', (req, res) => {
  exec("shutdown -a")
  res.json({ message: 'Mercy command executed' }).status(200);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
