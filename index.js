var express = require('express');
var app = express();
var request = require('request');

app.get('/', function (req, res) {
    const battletag = req.query.battletag;

    if (battletag) {



        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});