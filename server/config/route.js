const users = require('../app/controllers/usersRoute');
const projects = require('../app/controllers/projectsRoute');
const tasks = require('../app/controllers/tasksRoute');
const path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => res.sendFile(path.join('dist', 'index.html')));
    
    app.post('/users', users.addUser);
    app.get('/users/:login', users.getUser);

    app.post('/projects', projects.addProject);
    app.get('/projects/:id', projects.getProject);
    app.put('/projects/:id', projects.updateProject);
    app.delete('/projects/:id', projects.deleteProject);

    app.post('/tasks', tasks.addTask);
    app.get('/tasks/:id', tasks.getTask);
    app.put('/tasks/:id', tasks.updateTask);
    app.delete('/tasks/:id', tasks.deleteTask);
}