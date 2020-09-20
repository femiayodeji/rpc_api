const methods = require('./methods');
const types = require('./types');

let routes = {
    // rpc endpoints
    '/rpc': function (body){
        return new Promise((resolve, reject) => {
            if(!body){
                throw new Error(`rpc request was expecting some data...!`);
            }
            let _json = JSON.parse(body);
            let keys = Object.keys(_json);
            let promiseArr = [];

            for (let key of keys){
                if(methods[key] && typeof(methods[key].exec) === 'function'){
                    let execPromise = methods[key].exec.call(null, _json[key]);
                    if(!(execPromise instanceof Promise)){
                        throw new Error(`exec on ${key} did not return a promise`);
                    }
                    promiseArr.push(execPromise);
                } else {
                    let execPromise = Promise.resolve({
                        error: 'method not defined'
                    })
                    promiseArr.push(execPromise);
                }
            }

            Promise.all(promiseArr).then(iter => {
                console.log(iter);
                let response = {};
                iter.forEach((val, index) => {
                    response[keys[index]] = val;
                });

                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    // the documentation endpoint
    '/doc': function(){
        return new Promise(resolve => {
            let type = {};
            let method = {};

            type = types;

            for(let m in methods){
                let _m = JSON.parse(JSON.stringify(methods[m]));
                method[m] = _m;
            }

            resolve({
                types: type,
                methods: method
            });
        });
    }
};

module.exports = routes;