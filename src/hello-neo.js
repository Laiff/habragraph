/**
 * Created by IntelliJ IDEA.
 * User: laiff
 * Date: 16.07.11
 * Time: 13:37
 * To change this template use File | Settings | File Templates.
 */

var neo = require('neo4j'),
    http = require('http');

var db = new neo.GraphDatabase('http://192.168.193.128:7474');
var server = http.createServer(function(req, res) {
    var print = function (err, result) {
        res.end(err || result);
        console.log(err || result);
    };
    res.writeHead(200);
    db.createNode({hello: 'world'}).save(print);
});

server.listen(8081);