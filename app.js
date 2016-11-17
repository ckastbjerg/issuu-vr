'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request');

function getDocs(id) {
    const req = `https://issuu.com/call/stream/web/reader_category/initial?safe_only=true&readerCategoryIds=${id}&pageSize=50&seed=3715&format=json`;
    return new Promise(function(resolve, reject) {
        request(req, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).rsp._content.stream.map(item => { return item.content }));
            } else {
                reject('Failed to getPublications');
            }
        });
    });
};

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res) {
    res.render(fs.readFileSync('./index.html', 'utf8'));
});

app.get('/category/:id', function (req, res) {
    getDocs(req.params.id).then(docs => {
        res.send(docs);
    })
});

var port = process.env.PORT || 8080;
http.listen(port, function() {
    console.log('listening on ', port);
});
