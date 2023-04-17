import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userservice/api/admin/wx/user/list',
    method: 'get'
  })
}

export function fetchWebUserList(query) {
  return request({
    url: '/userservice/api/admin/web/user/list',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function updateUser(data) {
  return request({
    url: '/userservice/api/admin/web/user/editinfo',
    method: 'post',
    data
  })
}
export function createUser(data) {
  return request({
    url: '/userservice/api/admin/web/user/create',
    method: 'post',
    data
  })
}
export function updatePwd(data) {
  return request({
    url: '/userservice/api/admin/web/user/setpwd',
    method: 'post',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: '/userservice/api/admin/web/user/delete/' + id,
    method: 'get'
  })
}
