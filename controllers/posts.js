const Post = require('../data/models/post.js');

module.exports = function (app) {

  // display all posts
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err.message);
      })
  })

  // display one post
  app.get('/posts/show/:id', (req, res) => {
    Post.findById(req.params.id).lean().populate('comments')
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

  // UPDATE
  // DESTROY

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });
}
