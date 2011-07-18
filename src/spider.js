/**
 * Created by IntelliJ IDEA.
 * User: laiff
 * Date: 17.07.11
 * Time: 15:49
 * To change this template use File | Settings | File Templates.
 */

var crawler = require('./crawler'),
    graph = require('./graph');

var spider = new process.EventEmitter();

var taskList = [];

spider.on('ready', function() {
    if (taskList.length == 0) {
        console.log('Queue is empty. Done.');
        process.exit(1);
    }

    var task = taskList.shift();
    if (task.list && typeof task.list === 'object') {
        spider.emit('new_list_page', task.list);
    } else if (task.person && typeof task.person === 'object') {
        spider.emit('new_person', task.person);
    } else {
        console.log('Wrong task type: ' + JSON.stringify(task));
    }
});

spider.on('new_list_page', function(listPage) {
    crawler.getPersonsOnPage(listPage, function(err, data) {
        console.log('Have new list ' + JSON.stringify(listPage));
        if (!err) {
            data.persons.forEach(function(person) {
                spider.emit('new_person', person);
            });
            data.lists.forEach(function(list) {
                spider.emit('new_list_page', list);
            })
        } else {
            console.log('Error while receive persons on list: ' + JSON.stringify(err));
        }

        setTimeout(function() {
            spider.emit('ready');
        }, 2000);
    });
});

spider.on('new_person', function(person) {
    if (!graph.checkPerson(person)) {
        crawler.getPerson(person, function(err, data) {
            console.log('Have new person: ' + JSON.stringify(person));
            if (!err) {
                graph.savePerson(person, data);
            } else {
                console.log('Error while receive person: ' + JSON.stringify(err));
            }

            setTimeout(function() {
                spider.emit('ready');
            }, 2000);
        });
    }
});

taskList.push({
    list : {
        url : 'http://habrahabr.ru/people/'
    },
    person : null
});
setTimeout(function(){
    spider.emit('ready');
}, 20000);

