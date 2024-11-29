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
5. Run the app with `npm start`. If error NODE_ENV is not a command occurs, simply `npm install -g win-node-env` then re-run the app
6. Open IIS Manager, on the left side, click "Sites", then on the right, "Add Website...", add your site name, and set physical path to this project dir. Don't forget to change the port, because 80 is already used by default.
7. Click the site name which has created, on the right there is "Edit Permissions", move to tab Security, add if not exist, add "Group or user names" with name IIS_IUSRS (check names because it should exist if the system enable IIS). Give full control to that role/object.
8. Access the website by "Browse Website" (at right bottom IIS control) or access directly in browser by typing the host, mostly localhost with port that has been binded when you create a new site in IIS management tool
9. Back to IIS Manager, go to Application Pools, at the bottom there will be this project name, and click it, go to "Advanced Settings..." and change the Identity from "ApplicationPoolIdentity" to "LocalSystem"
10. Refresh the browser page

### Standalone output

1. Build the app, with `npm run build`
2. if in the next.config you use `output: "standalone"` then you know that public folder and .next/static folder may needed, just place them in the standalone folder that just been generated
2. Copy the server.js and web.config to that standalone folder.
3. Because there is an issue when run a [custom server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server) with standalone build, the solution I found is to copy `const nextConfig = ...` and `process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)` paste them before `const app = next({ dev })`.
4. If you prefer to run the nextjs app with `npm run start`, don't forget to change the package.json scripts.start with `NODE_ENV=production node server.js`.
5. Start the server either with `npm run start` or `NODE_ENV=production node server.js`
6. Create a new site in IIS management, set the physical path to that standalone folder, don't forget to give full control to IIS_USRS and also do step 9 in Normal Output
7. Access the website by "Browse Website" (at right bottom IIS control) or access directly in browser by typing the host, mostly localhost with port that has been binded when you create a new site in IIS management tool