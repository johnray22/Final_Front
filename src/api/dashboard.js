import request from '@/utils/request'

export function getLatestInfos() {
  return request({
    url: '/userservice/api/statistics/dashinfo',
    method: 'get'
  })
}
