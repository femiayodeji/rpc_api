'use strict';

let users = {};
let tasks = {};

//using inmemory for now
const db = {
    users: proc(users),
    tasks: proc(tasks)
};

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

function proc(container){
    return {
        save(obj){
            let _obj = clone(obj);

            if(!_obj.id){
                _obj.id = (Math.random() * 10000000) | 0;
            }

            container[_obj.id.toString()] = _obj;
            return clone(_obj);
        },
        retrieve(id){
            return clone(container[id.toString()]);
        },
        retrieveAll(){
            let _store = [];
            for(let item in container){
                _store.push(clone(container[item]));
            }
            return _store;
        },
        remove(id){
            delete container[id];
        }
    }
}

module.exports = db;