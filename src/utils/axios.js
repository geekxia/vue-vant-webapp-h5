import axios from 'axios'
import { Toast } from 'vant'

const baseURL = 'http://localhost:8083'
const version = '/api/v1'

// 创建一个axios实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 7000,
  headers: {}
})

// 封装请求拦截器（是请求被发出去之前）
instance.interceptors.request.use(function (config) {
  // console.log('请求拦截器config', config)
  // 在请求被发出去之前做一些事儿
  // 加 token 鉴权
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 封装响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log('响应拦截器response', response)
  // 在响应数据回来之前做一些事儿
  // 要根据http状态码判断请求是否成功，如果不成功要提示用户
  // 要根据业务状态码对数据进行过滤
  let res = null
  // HTTP状态码
  if(response.status===200) {
    if(response && response.data) {
      // 业务状态码
      const err = response.data.err
      switch (err) {
        case 0:
          res = response.data.data
          break
        case -1:
          // 当token失效时，后端会返回 err=-1业务状态码
          window.location.href = '/#/login'
          break
        default:
          Toast(response.data.msg)
      }
    }
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
