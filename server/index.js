require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

require('./app/models/usersModel');
require('./app/models/projectsModel');
require('./app/models/tasksModel');


let app = express(); //creating server

require('./config/express') (app, express);
require('./config/route') (app);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,     
    useUnifiedTopology: true     
})
.then(() => console.log('Connection to database is sucsessful'))
.catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Server running...');
    console.log('Listening at localhost:' + process.env.PORT);
});



