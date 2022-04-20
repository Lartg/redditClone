const Post = require('../data/models/post.js');
const User = require('../data/models/user');
const Comment = require('../data/models/comment');
module.exports = function (app) {

  // display all posts
  app.get('/', (req, res) => {
    const { user } = req;
    console.log(req.cookies);
    Post.find({}).lean().populate('author')
      .then((posts) => res.render('posts-index', { posts, user }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // display one post
  app.get('/posts/show/:id', (req, res) => {
    const currentUser = req.user;

    Post.findById(req.params.id).lean().populate({ path: 'comments', populate: { path: 'author' } }).populate('author')
      .then((post) => res.render('posts-show', { post, currentUser }))
      .catch((err) => {
        console.log(err.message);
      });
  });


  // CREATE
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  app.post('/posts/new', (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const post = new Post(req.body);
      post.author = userId;

      post
        .save()
        .then(() => User.findById(userId))
        .then((user) => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          return res.redirect(`/posts/${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // UPDATE
  // DESTROY

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    const currentUser = req.user;
    const { subreddit } = req.params;
    Post.find({ subreddit }).lean().populate('author')
      .then((posts) => res.render('posts-index', { posts, currentUser }))
      .catch((err) => {
        console.log(err);
      });
  });
}
