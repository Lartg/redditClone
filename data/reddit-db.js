/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://127.0.0.1/reddit-db'; //mongodb://localhost/reddit-db
mongoose.connect(
  url,
  function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to database');

    //db.close(); //turn on for testing
  }
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;