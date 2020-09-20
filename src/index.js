const http = require('http');
const requestListener = require('./requestListener');

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 2020;

server.listen(PORT);
console.log(`http://localhost:${PORT}/doc`)