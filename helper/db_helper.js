var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306",
  database: "newsblog",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

function getNews(callback) {
  connection.query(
    "SELECT DISTINCT NewsID, headline, content, date, firstname, surname FROM news, author WHERE author.authorID = news.authorID",
    (error, result, field) => {
      if (error) callback(error, null)
      return callback(null, result);
    }
  );
}

function getPost(postID, callback) {
  var query =
    "SELECT NewsID, headline, content, date, firstname, surname FROM news, author WHERE news.NewsID=" +
    connection.escape(postID);
  console.log(query);
  connection.query(query, (error, result) => {
    if (error) console.log(error);
    return callback(null, result);
  });
}

function getNewsIds(callback) {
  connection.query("SELECT NewsID FROM news;", (error, result) => {
    if (error) callback(error, null);
    return callback(null, result);
  });
}

function getHeadlines(callback) {
  connection.query("SELECT headline FROM news", (error, result, field) => {
    if (error) callback(error, null);
    return callback(null, result);
  });
}

function checkUser(userMail, first, second, callback) {
  connection.query(
    "SELECT * FROM author WHERE mail=" + connection.escape(userMail),
    (error, result, field) => {
      if (error) callback(error, null);
      if (result.length > 0) {
        console.log("Exist");
        return callback(null, result[0].authorID);
      } else {
        console.log("Not exist");
        var query =
          'INSERT INTO `author` (`authorID`, `firstname`, `surname`, `salut`, `mail`, `password`) VALUES (NULL, ' + connection.escape(first) + ', ' + connection.escape(second) + ', ' + '\'Herr\'' + ', ' + connection.escape(userMail) + ', NULL);';
        console.log(query);
        connection.query(query, (error, newresult, field) => {
          if (error) callback(error, null);
          return callback(null, newresult.insertId);
        });
      }
      return callback(null, result);
    }
  );
}

function postStory(userID, story, headline, callback) {
  var query =
    "INSERT INTO `news` (`NewsID`, `authorID`, `headline`, `content`, `date`) VALUES (NULL, " + userID + ", " + connection.escape(headline) + ", " + connection.escape(story) + ", NOW());";
  connection.query(query, (error, result, field) => {
    if (error) callback(error, null);
    return callback(null, result.insertId);
  });
}

exports.postStory = postStory;
exports.checkUser = checkUser;
exports.getHeadlines = getHeadlines;
exports.getNews = getNews;
exports.getNewsIds = getNewsIds;
exports.getPost = getPost;
