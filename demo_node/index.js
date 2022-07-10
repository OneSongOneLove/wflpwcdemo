const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const routerApi = require('./server/router')
const api = require('./server/api')

const app = express()

app.use(bodyParser.json())

function ReadToFile(url, type) {
    fs.readFile(url, "utf8", function (err, data) {
        if (err) {
            return;
        }
        ConvertToList(data, function (list) {
            list.forEach(element => {
                if (type === 'task' && element[0]) {
                    let info = {
                        Task: element[0],
                        Priority: element[1],
                        Description: element[2],
                        Assignee: element[3],
                        Phase: element[4],
                        AssigneeId: element[5]
                    }
                    api.taskAdd(info)
                } else if (type === 'user' && element[0]) {
                    let info = {
                        UserId: element[0],
                        Name: element[1],
                        Email: element[2],
                        Title: element[3]
                    }
                    api.userAdd(info)
                }
            });
        })
    });
}

function ConvertToList(data, callBack) {
    data = data.toString();
    var list = new Array();
    var rows = new Array();
    rows = data.split("\r\n");
    for (var i = 1; i < rows.length; i++) {
        list.push(rows[i].split(","));
    }
    callBack(list);
}

ReadToFile('./data/data1.csv', 'task')
ReadToFile('./data/data2.csv', 'user')

app.use('/api', routerApi)

app.listen('7001', () => {
    console.log('server run localhost:7001')
})