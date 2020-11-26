var express = require('express');
var router = express.Router();
var db = require('../helper/db_helper');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/tmp', function(req, res, next) {
  var myres = null
  db.getNews(function(err, data){
    var post;
    for(post of data){
      console.log(post.content)
      post.content = post.content.substring(0,500)
      console.log(post.content)
    }
    var out = [data[0], data[0]]
    res.render('tmplate', { title: 'Express', news: out });
    console.log(myres)
  })
});

/* GET wirte Post. */
router.get('/write', function(req, res, next) {

  res.render('write', { title: 'Express', news: null });
});


/* GET post page. */
router.get(/\/post1?[0-9]$/, function(req, res, next) {
  var post_num = req.url.match(/\d+/)[0];
  console.log(post_num)
  db.getPost(post_num, function(err, data){
    res.render('post', { title: 'Express', news: data[0] });
  })
});

module.exports = router;
