const mongoose = require('mongoose');
const Tasks = mongoose.model('Tasks');

const addTask = (req, res) => {
    Tasks.create({
        nameTask: req.body.nameTask,
        done: req.body.done,
        projectId: req.body.projectId
    })
    .then(task => res.send(task))
    .catch(err => console.log(err));
}

const getTask = (req, res) => {
    Tasks.find({projectId: req.params.id}).sort({priority: -1})
    .then(task => res.send(task))
    .catch(err => res.send(err)); 
}

const updateTask = (req, res) => { 
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
   
}

const deleteTask = (req, res) => {    
    Tasks.findById(req.params.id, (err, task) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        task.remove();
        res.sendStatus(200);        
    }); 
}

module.exports = {
    addTask,
    getTask,
    updateTask,
    deleteTask
}

