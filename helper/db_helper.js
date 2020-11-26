var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'newsblog'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});



function getNews(callback) {
    connection.query('SELECT NewsID, headline, content, date, firstname, surname FROM news, author', (error, result, field) => {
        if (error) console.log(error)
        return callback(null, result);
    })
}

function getPost(postID, callback) {
    var query = 'SELECT NewsID, headline, content, date, firstname, surname FROM news, author WHERE news.NewsID=' + postID; 
    console.log(query)
    connection.query(query, (error, result) => {
        if (error) console.log(error)
        return callback(null, result);
    })
}

function getNewsIds(callback) {
    connection.query('SELECT NewsID FROM news;', (error, result) => {
        if (error) console.log(error)
        return callback(result);
    })
}

function getHeadline(callback) {
    connection.query('SELECT headline FROM news', (error, result, field) => {
        if (error) console.log(error)
        return callback(result);
    })
}


exports.getHeadline = getHeadline;
exports.getNews = getNews
exports.getNewsIds = getNewsIds
exports.getPost = getPost