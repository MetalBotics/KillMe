import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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