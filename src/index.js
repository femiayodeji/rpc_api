const http = require('http');
const url = require('url');

const requestListener = null;

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 2020;