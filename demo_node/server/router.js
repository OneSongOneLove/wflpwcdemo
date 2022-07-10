const express = require('express')
const api = require('./api')

const router = express.Router()

// 账号列表
router.post('/task/list', function (req, res, next) {
    api.getTaskList(req, res, next)
})

// 账号列表
router.post('/user/list', function (req, res, next) {
    api.getUserList(req, res, next)
})

// 排序更新
router.post('/task/sort', function (req, res, next) {
    api.taskSort(req, res, next)
})


module.exports = router