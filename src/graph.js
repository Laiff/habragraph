/**
 * Created by IntelliJ IDEA.
 * User: laiff
 * Date: 17.07.11
 * Time: 18:10
 * To change this template use File | Settings | File Templates.
 */
var neo = require('neo4j');

var db = new neo.GraphDatabase('http://192.168.193.128:7474');

var savePerson = function(person) {
    console.log('savePerson: ' + JSON.stringify(person));
};

var checkPerson = function(person) {
    console.log('checkPerson: ' + JSON.stringify(person));
    return false;
};

module.exports.savePerson = savePerson;
module.exports.checkPerson = checkPerson;
