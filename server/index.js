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

const ProjectsShema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    deadline: {
        type: Date,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    }
});

const Projects = new mongoose.model('Projects', ProjectsShema);

const TasksShema = new mongoose.Schema({
    nameTask: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    priority: {
        type: String,
        required: false,
    },
    projectId: {
        type: String,
        required: true,
    }
});

const Tasks = new mongoose.model('Tasks', TasksShema);

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

app.post('/projects', (req, res) => {
    Projects.create({
        name: req.body.name,
        deadline: req.body.deadline,
        priority: req.body.priority,
        userId: req.body.userId
    })
    .then(project => res.send(project))
    .catch(err => console.log(err));
});

app.get('/projects/:id', (req, res) => {
    Projects.find({userId: req.params.id})
    .then(projects => res.send(projects))
    .catch(err => res.send(err));
});

app.put('/projects/:id', (req, res) => {
    Projects.findById(req.params.id, (err, project) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        if(req.body.name) project.name = req.body.name;
        if(req.body.deadline) project.deadline = req.body.deadline;
        project.save();
        res.sendStatus(200);
    });
});

app.delete('/projects/:id', (req, res) => {
    Projects.findById(req.params.id, (err, project) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        project.remove();
        res.sendStatus(200);        
    });
});



app.post('/tasks', (req, res) => {
    Tasks.create({
        nameTask: req.body.nameTask,
        done: req.body.done,
        projectId: req.body.projectId
    })
    .then(task => res.send(task))
    .catch(err => console.log(err));
});

app.get('/tasks/:id', (req, res) => {
    Tasks.find({projectId: req.params.id}).sort({priority: -1})
    .then(task => res.send(task))
    .catch(err => res.send(err));
});

app.put('/tasks/:id', (req, res) => {
    Tasks.findById(req.params.id, (err, task) => {
        if(err) {
            console.error(err);
            return res.s
            sendStatus(500);
        }
        if(req.body.nameTask) task.nameTask = req.body.nameTask;
        task.done = req.body.done || false;        
        if(req.body.priority) task.priority = req.body.priority;
        task.save();
        res.sendStatus(200);
    });
});

app.delete('/tasks/:id', (req, res) => {
    Tasks.findById(req.params.id, (err, task) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        task.remove();
        res.sendStatus(200);        
    });
});