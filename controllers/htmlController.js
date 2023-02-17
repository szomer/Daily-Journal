const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const PARAGRAPHS = {
  home: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti unde fugit voluptatibus quam incidunt accusantium, nobis ex minima quaerat nostrum nam.',
  about:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nisi, doloribus omnis accusantium quia eligendi molestiae incidunt expedita, inventore, consectetur obcaecati soluta praesentium nihil quibusdam? Iure, rerum sit. Vel consectetur explicabo impedit itaque doloribus! Obcaecati beatae quis eaque impedit necessitatibus ducimus labore ut, a tempore earum laudantium minus quibusdam accusantium veritatis tenetur quae harum at autem recusandae doloribus velit perferendis. Quia quam vitae non autem, nulla veniam voluptas delectus distinctio.',
  contact:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti reprehenderit in, suscipit quas architecto vitae, beatae expedita nobis perspiciatis mollitia dolores unde officia. Facilis, quam? Esse nostrum aspernatur eum, dignissimos, autem culpa consequuntur dolorem minima ipsum perspiciatis temporibus repellat porro sint quo quos quasi sapiente incidunt perferendis delectus corporis. Libero eius maxime atque eveniet architecto.',
};

let posts = [];

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', { home: PARAGRAPHS.home, posts: posts });
  });

  app.get('/about', function (req, res) {
    res.render('about', { about: PARAGRAPHS.about });
  });

  app.get('/contact', function (req, res) {
    res.render('contact', { contact: PARAGRAPHS.contact });
  });

  app.get('/compose', function (req, res) {
    res.render('compose');
  });
  app.post('/compose', urlencodedParser, function (req, res) {
    const post = {
      title: req.body.postTitle,
      content: req.body.postBody,
    };
    posts.push(post);

    res.render('home', { home: PARAGRAPHS.home, posts: posts });
  });

  app.get('/post/:id', function (req, res) {
    const index = Number(req.params.id);

    if (posts.length > 0 && index >= 0 && index < posts.length) {
      res.render('post', { post: posts[req.params.id] });
    } else {
      res.redirect('/error');
    }
  });
};
