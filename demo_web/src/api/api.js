import http from './http'

// 获取task任务
export const getTask = (data) => {
    return http.post('/api/task/list', data)
}

// 获取用户
export const getUser = (data) => {
    return http.post('/api/user/list', data)
}

// 更新排序
export const sortChange = (data) => {
    return http.post('/api/task/sort', data)
}