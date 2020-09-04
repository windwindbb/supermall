import axios from 'axios'

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: "", //这里的数据接口需要找老师要,添加微信codewhy003
    timeout: 5000
  })
  // 2. axios的拦截器
  // 1.请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送axios请求
  return instance(config)
}