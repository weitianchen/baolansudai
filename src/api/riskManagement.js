import request from '@/utils/request'
import qs from 'qs'

// 黑名单查询
export function blackList(query) {
    return request({
        url: '/api/query',
        method: 'get',
        params: query,
    })
}
// 查询记录
export function getCredit(query) {
    return request({
        url: '/api/credit',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}