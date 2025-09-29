# KillMe

<a href="https://www.npmjs.com/package/@metalbotics/killme"> <img src="https://img.shields.io/badge/npm_package-white?style=for-the-badge&logo=npm&logoColor=red"/> </a>
- Express.js API to kill target PCs.
- Usage: <br/><br/>
  `http://localhost:5000/kill/60` in seconds.<br>
  `http://localhost:5000/kill/1min` in minutes.<br/>
  `http://localhost:5000/mercy` to cancel shutdown.<br><br/>

Since the server is running on 0.0.0.0, the server can be accessible for any computer in the network, you can use `ipconfig` to see the IP of the machine you want to shutdown and do it via another device by doing the request.
## npm package

Install:

```bash
npm install @metalbotics/killme
```

Programmatic usage:

```ts
import { KillMeConfig } from '@metalbotics/killme';
import KillMe from '@metalbotics/killme';

const config: KillMeConfig = {
  port:5000,
  host:"0.0.0.0"
}

const killMe = new KillMe(config)

killMe.startServer()

// later
killMe.stopServer();
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




