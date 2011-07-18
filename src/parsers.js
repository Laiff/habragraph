/**
 * Created by IntelliJ IDEA.
 * User: laiff
 * Date: 18.07.11
 * Time: 0:25
 * To change this template use File | Settings | File Templates.
 */
var html = require('htmlparser'),
    select = require('soupselect').select;

var createDom = function(data) {
    var handler = new html.DefaultHandler(function(arror, dom){});
    var parser = new html.Parser(handler);
    parser.parseComplete(data);
    return handler.dom;
};

var parsePersonsOnPage = function(data) {
    var dom = createDom(data);

    var persons = [],
        list = [];

    select(dom, 'td.user dt a').forEach(function(personElement) {
        persons.push(personElement.attribs.href);
    });
    return {
        persons : persons,
        list : list
    };
}

var parsePerson = function(data) {
    var dom = createDom(data);

    return {};
}

module.exports.parsePersonsOnPage = parsePersonsOnPage;
module.exports.parsePerson = parsePerson;

