const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const htmlController = require('./controllers/htmlController');

dotenv.config();

const url = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

const app = express();

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

(async function run() {
  var journalSchema, Post;

  // db
  try {
    // strictQuery will become false in mongoose 7
    mongoose.set('strictQuery', false);
    // connect to db
    await mongoose.connect(url);
    console.log('Database connected..');
    // create schema with validation
    journalSchema = await mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    });

    // create model
    Post = mongoose.model('Post', journalSchema);

    // get the posts from db
    const posts = await getPosts();

    htmlController(app, posts, Post);
  } catch (err) {
    console.log(err);
  }

  app.use(function (req, res) {
    // render the error page
    res.status(500);
    res.render('error');
  });

  app.listen(port, () => {
    console.log('Listening on port ' + port + '..');
  });

  async function getPosts() {
    var list = [];

    try {
      const posts = await Post.find({});
      posts.forEach((element) => {
        list.push({
          id: element.id,
          title: element.title,
          content: element.content,
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log('returning posts...');
      return list;
    }
  }
})();
