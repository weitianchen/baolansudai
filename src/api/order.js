import request from '@/utils/request'
import qs from 'qs'
// 获取订单
export function loanApply(query) {
    return request({
        url: '/api/loanApply',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}
// 更新备注
export function putLoanApply(query) {
    return request({
        url: '/api/loanApply',
        method: 'put',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}
// loanApply/fp
// 批量分配
export function loanApplyFp(query) {
    return request({
        url: '/api/loanApply/fp',
        method: 'put',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}
// 催收接口// /api/collection 
export function getCollection(query) {
    return request({
        url: '/api/collection',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}
// 催收接口// /api/collection 
export function putCollection(query) {
    return request({
        url: '/api/collection',
        method: 'put',
        params: query
    })
}