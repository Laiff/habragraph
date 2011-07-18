/**
 * Created by IntelliJ IDEA.
 * User: laiff
 * Date: 17.07.11
 * Time: 17:38
 * To change this template use File | Settings | File Templates.
 */
var http = require('http'),
    url = require('url'),
    parser = require('./parsers');

var getPage = function(host, path, callback) {
    var options = {
        host : host,
        port : 80,
        path : path,
        method : 'GET'
    };

    var req = http.request(options, function(res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            callback(null, data);
        });
    });
    req.on('error', function(e) {
        callback(e.message);
    });
    req.end();
};

var extractHost = function(urlStr) {
    return url.parse(urlStr).hostname;
};

var extractPath = function(urlStr) {
    return url.parse(urlStr).pathname;
};

var parsePersonsOnPage = function(data){
    return parser.parsePersonsOnPage(data);
};

var parsePerson = function(data){
    return parser.parsePerson(data);
};

var createCallback = function(realCallback, parser) {
    return function(err, data){
        if (!err) {
            realCallback(null, parser(data));
        } else {
            realCallback(err);
        }
    }
}

var getPersonsOnPage = function(listPage, callback) {
    console.log('request new page: ' + JSON.stringify(listPage));
    getPage(extractHost(listPage.url), extractPath(listPage.url), createCallback(callback, parsePersonsOnPage));
};

var getPerson = function(person, callback) {
    console.log('request new person: ' + JSON.stringify(listPage));
    getPage(extractHost(person.url), extractPath(person.url), createCallback(callback, parsePerson));
};

module.exports.getPersonsOnPage = getPersonsOnPage;
module.exports.getPerson = getPerson;
