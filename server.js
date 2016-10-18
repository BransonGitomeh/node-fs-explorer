var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(express.static("."))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.post('/files', function(req, res) {
    console.log(req.body)
    fs.readdir(req.body.path, function(err, flist) {
        if (err) {
            // check if the url leads to a file
            fs.readFile(req.body.path, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data);
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

function log(argument) {
    console.log(argument)
}

app.listen("3000", log)

var fs = require("fs")
