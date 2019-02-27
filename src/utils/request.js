import axios from 'axios'
import { Message, Loading, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  }
})
let loading;
let off = false;
function startLoading() {
  off = true;
  loading = Loading.service({
    lock: true,
    text: '努力加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  off = false;
  loading.close()
}
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  startLoading()
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X_Auth_Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  // response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
    endLoading()
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      //  402:Token 过期了;
      if (res.code === 402) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    endLoading()
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
