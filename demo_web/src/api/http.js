import axios from 'axios'

const http = axios.create({
    baseURL: window.location.origin,
    timeout: 10000,
})


/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
http.interceptors.request.use(
    (config) => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.authorization = token  //请求头加上token
        }
        return config;
    },
    error => Promise.reject(error)
)

// 响应拦截器
http.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.msg);
            return Promise.reject(response);
        } else {
            // 断网的情况
            console.log("请求出错");
        }
    }
)

/** 
 * 请求失败后的错误统一处理 
 * @param status 请求失败的状态码
 */
const errorHandle = (status, errorMsg) => {
    // 状态码判断
    switch (status) {
        case 400:
            console.log("请求出错");
            break;
        case 404:
            console.log("请求资源不存在");
            break;
        case 500:
            console.log("服务器错误");
            break;
        default:
            console.log(errorMsg);
    }
}

export default http