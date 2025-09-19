# KillMe

- Express.js API to kill target PCs.
- Usage: <br>
  `http://localhost:5000/kill/60` in seconds.<br>
  `http://localhost:5000/kill/1min` in minutes.

- Since the server is running on 0.0.0.0, the server can be accessible for any computer in the network, you can use `ipconfig` to see the IP of the machine you want to shutdown and do it via another device by doing the request.
## npm package

This repository can be published as an npm package that exposes a programmatic API.

Install (when published):

```bash
npm install @metalbotics/killme
```

Programmatic usage:

```ts
import { startServer, stopServer } from '@metalbotics/killme';

const { app, server } = startServer({ port: 4000, host:"127.0.0.1" }); // or host:"0.0.0.0" for full local visibility

// later
stopServer();
```

CLI / Run locally:

```bash
npm install
npm run build
npm start
```

Development (fast reload):

```bash
npm install
npm run dev
```

Security warning: This package runs OS shutdown commands. Do NOT publish or use this on untrusted networks. Use only for local, internal, or testing purposes.


