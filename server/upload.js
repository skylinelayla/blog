/**
 * @file 上传md
 */

const path = require('path');
const fs = require('fs');
const POST_PATH = path.join(__dirname, `./posts/${process.argv[2]}`);
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DB_CONN_STR = '';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

// 发现文件变更就上传

function readFile() {
    console.log(process.argv);
    let info = {
        title: process.argv[3],
        date: new Date().toLocaleDateString('en-US', options),
        content: fs.readFileSync(POST_PATH, 'utf8')
    };
    MongoClient.connect(DB_CONN_STR, (err, db) => {
        var collection = db.collection('posts');
        collection.insertMany([info], (err, res) => {
            console.log('finnish');
        });
        db.close();
    });
}

readFile();