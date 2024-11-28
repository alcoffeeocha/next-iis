# Deploy Next.js on Internet Information Services

## Required

- Windows OS and IIS Management Tools
    - Enable "Control Panel > Turn Windows features on or off > Internet Information Services > Web Management Tools" and "World Wide Web Services"
    - Inside Word Wide web Services > Application Development Features, enable all except CGI
- [iisnode](https://github.com/tjanczuk/iisnode)
    - find Installing for IIS 7.x/8.x
- [URL Rewrite Module for IIS](https://iis-umbraco.azurewebsites.net/downloads/microsoft/url-rewrite)
    - just scroll to bottom
- Node.js
    - path for node.exe will be needed
- server.js and web.config
    - I found simpler: https://github.com/mfmakarim/nextjs-iis

## Steps

### Normal output

In the Windows OS environment.

1. Create `server.js` at the root of project, this file acts as custom node server. Just copy file from this project.
2. Create `web.config` which will be used by IIS. Also just copy file from here.
3. Build the app, with `npm run build` or other package managers.
4. Change `package.json` scripts.start to `NODE_ENV=production node server.js`.
5. Run the app `npm start`. If error NODE_ENV occurs, simply `npm install -g win-node-env` then re-run
6. Open IIS Manager, on the left side, click "Sites", then on the right, "Add Website...", add your site name, and set physical path to this project dir
7. Click the site name which has created, on the right there is "Edit Permissions", move to tab Security, add if not exist, add "Group or user names" with name IIS_IUSRS (check names because it should exist if the system enable IIS). Give full control to that role/object.
8. Open the web via "Browse Website" (right bottom)
9. Back to IIS Manager, go to Application Pools, at the bottom there will be this project name, and click it, go to "Advanced Settings..." and change the Identity from "ApplicationPoolIdentity" to "LocalSystem"

### Standalone output

1. if in the next.config you use `output: "standalone"` then you know that public folder and .next/static folder is needed, just place them in the standalone folder
2. Copy the server.js and web.config to that standalone folder.
3. Because there is an issue when run [custom server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server) with standalone build, the solution I found is to copy `const nextConfig = ...` and `process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)` paste them before `const app = next({ dev })`.
4. `npm run start` or `node start.js`
5. Done