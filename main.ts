import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Simple API for turning the host PC off (Windows only)
// Do not expose this, use only in internal networks

app.get('/', (req, res) => {
  res.send('KillMe API running!');
});

app.get('/kill/:time', (req, res) => {
  let time: string | Number = req.params.time;
  if(time.endsWith("min")) {
    time = parseInt(time.replace("min", ""));
    time = time as number * 60;
  }
  if(!isNaN(time as number)) {
    res.json({ message: `Kill command executed, PC will shut down in ${time} seconds` }).status(200);
    exec(`shutdown -f -s -t ${time}`)
  }
  else {
    res.json({ message: 'Invalid time parameter' }).status(400);
  }
  console.log(time)
});

app.get('/mercy', (req, res) => {
  exec("shutdown -a")
  res.json({ message: 'Mercy command executed' }).status(200);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});