const mongoose = require('mongoose');

const UsersShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Users = new mongoose.model('Users', UsersShema);