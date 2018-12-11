/**
 * 提供一些接口 。。
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DB_CONN_STR = '';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const whiteList = ['http://localhost:8081', 'http://localhost:80'];
const corsOptions = {
    origin(origin, cb) {
        if (whiteList.indexOf(origin) !== -1) {
            cb(null, true);
        }
        else {
            cb(new Error('Not Allow CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

function searchArticle(db, callback) {
    var collection = db.collection('posts');

    collection.find({}, { "title": 1, "date": 1, "_id": 1 }, (err, cursor) => {
        callback(cursor);
    });
}

function searchBlog(db, callback, id) {
    var collection = db.collection('posts');
    collection.find({ "_id": ObjectId(id) }, function(err, data) {
        callback(data);
    });
}

app.get('/all', (req, res) => {
    //获取列表
    MongoClient.connect(DB_CONN_STR, (err, db) => {
        var listAll = [];
        console.log('connect success');
        searchArticle(db, (cursor) => {
            cursor.each((error, doc) => {
                if (doc) {
                    listAll.push(doc);
                }
                else {
                    res.send(listAll);
                }
            });
            db.close();
        });
    });
});

app.get('/blog/:id', function (req, res) {
    var id = req.params.id;
    var content;
    MongoClient.connect(DB_CONN_STR, (err, db) => {
        searchBlog(db, result => {
            result.each((error, doc) => {
                if (doc) {
                    content = doc;

                }
                else {
                    res.send(content);
                }
            });
        }, id);
        db.close();
    });
});

app.listen(8825, () => {
    console.log('blog server start');
});
