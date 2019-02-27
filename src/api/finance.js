import request from '@/utils/request'
import qs from 'qs'
// 金币记录
export function logCoin(query) {
    return request({
        url: '/api/logCoin',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}