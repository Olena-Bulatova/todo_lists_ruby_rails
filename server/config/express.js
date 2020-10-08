const bodyParser = require('body-parser');

module.exports = (app, express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('dist'));
}