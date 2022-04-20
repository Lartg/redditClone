const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');


const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: false },
  summary: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  subreddit: { type: String, required: true }
});
postSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'));

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