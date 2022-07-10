// 引入mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 连接MongoDB数据库,如果端口号是默认的（27017），可以不用写
mongoose.connect('mongodb://localhost:27017/test10')

// 创建task的Schema
const taskSchema = new Schema({
    Task: String,
    Priority: String,
    Description: String,
    Assignee: String,
    Phase: String,
    AssigneeId: String
})

// 创建user的Schema
const userSchema = new Schema({
    UserId: String,
    Name: String,
    Email: String,
    Title: String
})

const Models = {
    taskInfo: mongoose.model('task', taskSchema),
    userInfo: mongoose.model('user', userSchema)
}

module.exports = Models