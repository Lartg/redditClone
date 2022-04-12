const { Schema, model } = require('mongoose');



const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: false },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true }
});

module.exports = model('Post', postSchema);

// ----------- doc style below
// const mongoose = require('mongoose');
// const schema = mongoose.Schema
// const postSchema = new schema({
//   title: { type: String, required: true },
//   url: { type: String, required: false },
//   summary: { type: String, required: true }
// });
// what is actually not working correctly is probably the connection link.. 
// module.exports = model('Post', postSchema);