import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/token/login',
    method: 'post',
    data
  })
}
export function codeLogin(data) {
  return request({
    url: '/api/auth/token/loginByPhone',
    method: 'post',
    data
  })
}
export function codeGet(data) {
  return request({
    url: '/api/auth/token/getVerifyCode',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/userservice/api/web/user/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/userservice/api/web/user/info',
    method: 'get'
  })
}

export function logout(data) {
  return request({
    url: '/api/auth/token/logout',
    method: 'post',
    data: { data }
  })
}
