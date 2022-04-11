const Post = require('../data/models/post.js');

module.exports = function (app) {

  // display all posts
  app.get('/', (req, res) => {
    Post.find().then((posts) => res.render('posts-index', { posts })).catch((err) => {
        console.log(err.message);
      })
  })

  // display one post
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean()
      .then((post) => res.render('posts-show', { post }))
      .catch((err) => {
        console.log(err.message);
      });
  });


  // CREATE
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })
  app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);
    post.save();
    res.redirect('/')
  });
}