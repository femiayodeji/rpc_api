'use strict';
let types = {
    user: {
        description: 'the details pf the user',
        props: {
            name: ['string', 'required'],
            age: ['number'],
            email: ['string', 'required'],
            password: ['string', 'required']
        }
    },
    task: {
        description: 'a task entered by the user to do at a later time',
        props: {
            userId: ['number', 'required'],
            content: ['string', 'required'],
            expire: ['date','required']
        }
    }
}

module.exports = types;