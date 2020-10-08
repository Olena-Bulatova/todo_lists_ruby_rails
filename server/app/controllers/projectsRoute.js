const mongoose = require('mongoose');
const Projects = mongoose.model('Projects');

const addProject = (req, res) => { 
    Projects.create({
        name: req.body.name,
        deadline: req.body.deadline,
        priority: req.body.priority,
        userId: req.body.userId
    })
    .then(project => res.send(project))
    .catch(err => console.log(err));
}

const getProject = (req, res) => { 
    Projects.find({userId: req.params.id})
    .then(projects => res.send(projects))
    .catch(err => res.send(err));
}

const updateProject = (req, res) => { 
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
}

const deleteProject = (req, res) => { 
    Projects.findById(req.params.id, (err, project) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        project.remove();
        res.sendStatus(200);        
    });
}

module.exports = {
    addProject,
    getProject,
    updateProject,
    deleteProject
}

