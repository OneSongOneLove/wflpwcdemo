const Models = require("./dbs");

const api = {
    taskAdd(data) {
        let task = new Models.taskInfo({
            Task: data.Task,
            Priority: data.Priority,
            Description: data.Description,
            Assignee: data.Assignee,
            Phase: data.Phase,
            AssigneeId: data.AssigneeId
        })

        Models.taskInfo.findOne({ 'Task': data.Task }, function (err, data) {
            if (!err && !data) {
                task.save(function (err) {
                    if (!err) {
                        console.log('task成功')
                    } else {
                        console.log('task失败')
                    }
                })
            }
        })
    },
    userAdd(data) {
        let task = new Models.userInfo({
            UserId: data.UserId,
            Name: data.Name,
            Email: data.Email,
            Title: data.Title
        })

        Models.userInfo.findOne({ 'UserId': data.UserId }, function (err, data) {
            if (!err && !data) {
                task.save(function (err) {
                    if (!err) {
                        console.log('user成功')
                    } else {
                        console.log('user失败')
                    }
                })
            }
        })
    },
    getTaskList(req, res, next) {
        let filter = {}
        if (req.body.search) {
            filter = {
                $or: [{ AssigneeId: req.body.search }]
            }
        }
        Models.taskInfo.find(filter).sort({ "Priority": 1 }).find({}, function (err, data) {
            console.log(data)
            if (!err) {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    result: {
                        list: data
                    }
                })
            } else {
                res.json({
                    code: 400,
                    msg: '查询出错'
                })
            }
        })
    },
    getUserList(req, res, next) {
        Models.userInfo.find({}).sort({ "UserId": 1 }).find({}, function (err, data) {
            if (!err) {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    result: {
                        list: data
                    }
                })
            } else {
                res.json({
                    code: 400,
                    msg: '查询出错'
                })
            }
        })
    },
    taskSort(req, res, next) {
        console.log(req.body)
        let { list } = req.body
        let error = null
        list.forEach(item => {
            console.log(item._id)
            Models.taskInfo.updateOne({ "_id": item._id }, item, function (err, data) {
                if (err) {
                    error = err
                }
            })
        });
        if (!error) {
            res.json({
                code: 200,
                msg: '操作成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '操作出错'
            })
        }
    }
}

module.exports = api