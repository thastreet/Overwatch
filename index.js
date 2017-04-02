var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
    const battletag = req.query.battletag;

    if (battletag) {



        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});