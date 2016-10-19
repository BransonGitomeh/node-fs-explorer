var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs")
var assert = require("assert")
var backwardsStream = require('fs-backwards-stream')


app.use(express.static("."))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.post('/files', function(req, res) {
    fs.readdir(req.body.path, function(err, flist) {
        console.log(req.body, "reading as directoty", err)
        if (err) {

            fs.readFile(req.body.path, "utf8", function(err, data) {
                if (err) throw err;
                // console.log(data);
                res.send({
                    type: "file",
                    content: data
                })
            });

        } else {
            console.log(flist)
            res.send({
                type: "folder",
                content: flist
            })
        }
    })
});

function log(err) {
    assert.ifError(err)
    console.log("server started @3000")
}

app.listen("3000", log)
