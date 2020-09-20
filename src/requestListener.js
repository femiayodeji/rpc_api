const routes = require('./routes');

const url = require('url');

const requestListener = (request, response) => {
    let reqUrl = `http://${request.headers.host}${request.url}`;
    let parseUrl = url.parse(reqUrl, true);
    let pathname = parseUrl.pathname;

    response.setHeader('Content-Type', 'application/json');

    let buffer = null;

    request.on('data', data  => {
        if(buffer === null) {
            buffer = data;
        } else {
            buffer = buffer + data;
        }
    });

    request.on('end', () => {
        let body = buffer !== null ? buffer.toString() : null;

        if(routes[pathname]) {
            let compute = routes[pathname].call(null, body);

            if(!(compute instanceof Promise)) {
                response.statusCode = 500;
                response.end('oops! server error!');
                console.warn(`Not a Promise`);
            } else {
                compute.then(res => {
                    response.end(JSON.stringify(res))
                }).catch(err => {
                    console.error(err);
                    response.statusCode = 500;
                    response.end('oops! server error!');
                });
            }
        } else {
            response.statusCode = 404;
            response.end(`oops! ${pathname} not found here`)
        }
    })
}

module.exports = requestListener;