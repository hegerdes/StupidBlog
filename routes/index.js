var express = require("express");
const { body, validationResult } = require("express-validator");
var router = express.Router();
var db = require("../helper/db_helper");

var storryIDs = null;

function getIDs(){
  db.getNewsIds(function (err, data) {
    if (err) console.log(err);
    storryIDs = data;
    console.log(storryIDs);
  });
}

getIDs()

/* GET home page. */
router.get("/", function (req, res, next) {
  db.getNews(function (err, data) {
    if (err) {
      console.log("ERRR");
      return res.render("error", { message: "Can't get News", status: 500 });
    } else {
      var post;
      for (post of data) {
        post.content = post.content.substring(0, 500);
        // out.insert(post.NewsID, post)
      }
      data.sort(function(a, b) {
        var keyA = a.NewsID,
          keyB = b.NewsID;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      return res.render("template", { title: "Express", news: data });
    }
  });
});

/* GET home page. */
router.get("/index", function (req, res, next) {
  db.getNews(function (err, data) {
    if (err) {
      console.log("ERRR");
      return res.render("error", { message: "Can't get News", status: 500 });
    } else {
      var post;
      for (post of data) {
        post.content = post.content.substring(0, 500);
        // out.insert(post.NewsID, post)
      }
      data.sort(function(a, b) {
        var keyA = a.NewsID,
          keyB = b.NewsID;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      return res.render("template", { title: "Express", news: data });
    }
  });
});

/* GET wirte Post. */
router.get("/write", function (req, res, next) {
  res.render("write");
});

/* POST wirte Post. */
router.post("/write", function (req, res, next) {
  // if(req.body.story.length < 5) {
  //   res.status(400).json({ errors: 'Story too short' });
  //   return;
  // }
  // if(req.body.email.length < 5) {
  //   res.status(400).json({ errors: 'Mail too short' });
  //   return;
  // }
  // if(req.body.title.length < 5) {
  //   res.status(400).json({ errors: 'Title too short' });
  //   return;
  // }

  db.checkUser(req.body.email, req.body.email, req.body.email, function (err, data) {
    if (err) console.log(err);
    db.postStory(data, req.body.story, req.body.title, function (err, newdata) {
      if (err) {
        console.log(err);
        return res.render("error", { message: err, status: 500 });
      } else {
        getIDs()
        console.log(newdata);
        return res.redirect("/post_" + newdata);
      }
    });
  });
});

/* GET post page. */
router.get(/\/post_([0-9]+)$/, function (req, res, next) {
  var post_num = req.url.match(/\d+/)[0];
  console.log(post_num);
  console.log(storryIDs);
  var found = false;
  for (story of storryIDs) {
    if (story.NewsID == post_num) {
      found = true;
      db.getPost(post_num, function (err, data) {
        return res.render("post", { title: "Express", news: data[0] });
      });
    }
  }
});

module.exports = router;
