// Require Libraries
const fetch = import('node-fetch');
const express = require('express');
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');


const cookieParser = require('cookie-parser');

const app = express();

// Middleware
const { engine } = require('express-handlebars');

app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const jwt = require('jsonwebtoken');

// Set db
require('./data/reddit-db');

// set routes
require('./controllers/posts')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000')
})

module.exports = app;