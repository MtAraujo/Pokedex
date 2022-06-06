const http = require('http');
const app = require('./index')
const port = process.env.PORT || 8080;

const server = http.createServer();
server.listen(port);
