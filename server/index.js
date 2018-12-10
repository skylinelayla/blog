/**
 * 提供一些接口 。。
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DB_CONN_STR = 'mongodb://xxxx:xxxxx@xxxxxx:2222/article';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


function searchArticle(db, callback) {
    console.log(db);
    var collection = db.collection('posts');

    collection.find({}, { "title": 1, "date": 1, "_id": 1 }, function(err, cursor) {
        callback(cursor);
    });
}

function searchBlog(db, callback, id) {
    var collection = db.collection('posts');
    collection.find({ "_id": ObjectId(id) }, function(err, data) {
        callback(data);
    })
}

app.get('/all', function(req, res) {
    //获取列表
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var listAll = [];
        console.log('connect success');
        searchArticle(db, function(cursor) {
            cursor.each(function(error, doc) {
                if (doc) {
                    listAll.push(doc);
                } else {
                    res.send(listAll);
                }
            });
            db.close();
        })
    })
});

app.get('/blog/:id', function(req, res) {
    var id = req.params.id;
    var content;
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        searchBlog(db, function(result) {
            result.each(function(error, doc) {
                if (doc) {
                    content = doc;

                } else {
                    res.send(content);
                }
            });
        }, id);
        db.close();
    })

});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});