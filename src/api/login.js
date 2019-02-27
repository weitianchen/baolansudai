import request from '@/utils/request'

export function loginByUsername(jsxxName, jsxxPwd) {
  const data = {
    jsxxName,
    jsxxPwd
  }
  return request({
    url: '/api/login',
    method: 'post',
    data: data 
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(phone) {
  return request({
    url: '/api/existence',
    method: 'get',
    params: phone 
  })
}


