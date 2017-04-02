const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
    const battletag = req.query.battletag;

    if (battletag) {
        request('https://playoverwatch.com/en-us/career/pc/us/' + battletag, function (error, response, body) {
            if (response && response.statusCode) {
                if (response.statusCode === 200) {
                    parseBody(res, body);
                } else {
                    res.sendStatus(response.statusCode);
                }
            }
        });
    } else {
        res.sendStatus(400);
    }
});

function parseBody(res, body) {
    const $ = cheerio.load(body);
    const result = {};

    result.playerName = $('.header-masthead').text();
    result.level = $('.player-level', '.masthead-player').children().first().text();
    result.levelFrameImageUrl = getContentBetweenParenthesis($('.player-level', '.masthead-player').css('background-image'));
    result.rankImageUrl = getContentBetweenParenthesis($('.player-rank', '.masthead-player').css('background-image'));

    res.json(result);
}

function getContentBetweenParenthesis(input) {
    return input.substring(input.indexOf('(') + 1, input.indexOf(')'));
}

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});