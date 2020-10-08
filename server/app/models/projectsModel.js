const mongoose = require('mongoose');

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