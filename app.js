// Require Libraries
const env = require('dotenv').config();
const fetch = import('node-fetch');
const cookieParser = require('cookie-parser');
const express = require('express');
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const checkAuth = require('./middleware/checkAuth');



const app = express();

// Middleware
const { engine } = require('express-handlebars');

app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkAuth);


const jwt = require('jsonwebtoken');

// Set db

require('./data/reddit-db');

// set routes
require('./controllers/auth')(app);
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/replies.js')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000')
})

module.exports = app;