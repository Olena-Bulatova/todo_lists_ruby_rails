const path = require('path'); // module for working with path
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

let app = express(); //creating server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('src'));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,    
})
.then(() => console.log('Connection to database is sucsessful'))
.catch((err) => console.log(err));

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

app.listen(process.env.PORT, () => {
    console.log('Server running...');
    console.log('Listening at localhost:' + process.env.PORT);
});

app.get('/', (req, res) => res.sendFile(path.join('src', 'index.html')));

app.get('/users/:login', (req, res) => {
    Users.findOne({login: req.params.login})
    .then(user => res.send(user))
    .catch(err => res.send(err));
});

app.post('/users', (req, res) => {
    Users.create({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.pass,
    })
    .then(user => res.send(user))
    .catch(err => res.send(err));
});

/* let db; 

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url); 

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/tasks', (req, res) => {
    db.collection('tasks').find().toArray((err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/services', (req, res) => {
    db.collection('services').find().toArray((err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/tasks/:id', (req, res) => {
    db.collection('tasks').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/services/:id', (req, res) => {
    db.collection('services').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.post('/services', (req, res) => {
    let service = {
        type: req.body.type, 
        tasks: req.body.tasks
    }

    db.collection('services').insertOne(service, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(service);
    });
});

app.post('/tasks', (req, res) => {
    let task = {
        typeOfService: req.body.typeOfService,
        taskOfService: req.body.taskOfService, 
        dateCreating: req.body.dateCreating, 
        taskText: req.body.taskText, 
        description: req.body.description, 
        location: req.body.location 
    }

    db.collection('tasks').insertOne(task, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});

app.put('/tasks/:id', (req, res) => {
    db.collection('tasks').updateOne({_id: ObjectID(req.params.id)},
        {$set: {
            typeOfService: req.body.typeOfService,
            taskOfService: req.body.taskOfService, 
            dateCreating: req.body.dateCreating, 
            taskText: req.body.taskText, 
            description: req.body.description, 
            location: req.body.location
        }}, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

app.put('/services/:id', (req, res) => {
    db.collection('services').updateOne({_id: ObjectID(req.params.id)},
        {$set: {
            type: req.body.type,
            tasks: req.body.tasks, 
        }}, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
    db.collection('tasks').deleteOne({_id: ObjectID(req.params.id)}, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

app.get('/location', (req, res) => {
    request('https://ipinfo.io', (err, respons, body) => {
    if(err) {
        console.error(err);
        return res.sendStatus(500);
    }
    return res.send(body);
  });
});


client.connect(err => {
    console.log('Connection success');

    db = client.db(dbname); 

    app.listen(process.env.PORT, () => {
        console.log('Server running...');
        console.log('Listening at localhost:' + process.env.PORT);
        console.log('Opening your system browser...');
    }); 
}); */