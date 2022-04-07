const Post = require('../models/post');

module.exports = function (app) {

  app.get('/', (req, res) => {
    res.render('home')
  })
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);
    post.save(() => res.redirect('/'));
  });
}