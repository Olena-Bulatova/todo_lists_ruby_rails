const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const addUser = (req, res) => {
    Users.create({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.pass,
    })
    .then(user => res.send(user))
    .catch(err => res.send(err));
}

const getUser = (req, res) => {    
    Users.findOne({login: req.params.login})
    .then(user => res.send(user))
    .catch(err => res.send(err));
}

module.exports = {
    addUser,
    getUser
}

