'use strict';

const { clone } = require('./utils')

let context = require('./db');

let methods = {
    createUser: {
        description: `creates a new user, and return the details of the new user`,
        params: ['user: the user object'],
        returns: ['user'],
        exec(userObj){
            return new Promise((resolve) => {
                if(typeof(userObj) !== 'object'){
                    throw new Error('Expected an object!');
                }

                //todo validations

                let _userObj = clone(userObj);
                _userObj.id = (Math.random() * 10000000) | 0;
                resolve(context.users.save(userObj));
            });
        }
    },
    getUser: {
        description: `gets the user of the given id`,
        params: ['id: the id of the user'],
        returns: ['user'],
        exec(userObj){
            return new Promise((resolve) => {
                if(typeof(userObj) !== 'object'){
                    throw new Error('Expected an object!');
                }
                //todo validations

                resolve(context.users.retrieve(userObj.id) || {})
            });
        }
    },
    getAllUsers: {
        description: `gets the entire list of users`,
        params: [],
        returns: ['list of all users'],
        exec(){
            return new Promise((resolve) => {
                resolve(context.users.retrieveAll() || {});
            });
        }
    },
    //other methods
}

module.exports = methods;