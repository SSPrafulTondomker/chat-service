
const PORT = process.env.PORT || 3000;

import app from "./app"
const appServer = app.listen(PORT);
console.log('wallet-service listening on port:', PORT);

appServer.keepAliveTimeout = 80000;
appServer.headersTimeout = 121000;
appServer.on('close', () => {
    console.log('app server closed');
});
