import request from '@/utils/request'

// 获取 系统推广
export function getFlowInfo(query) {
    return request({
        url: '/api/flowInfo',
        method: 'get',
        params: query
    })
}
// 设置系统推广
export function setFlowInfo(query) {
    return request({
        url: '/api/flowInfo',
        method: 'put',
        params: query
    })
}
// 获取自主推广
export function getLoanMarke(query) {
    return request({
        url: '/api/loanMarke',
        method: 'get',
        params: query
    })
}
// 更新自主推广
export function putLoanMarke(query) {
    return request({
        url: '/api/loanMarke',
        method: 'put',
        params: query
    })
}
// 新增自主推广
export function postLoanMarke(query) {
    return request({
        url: '/api/loanMarke',
        method: 'post',
        params: query
    })
}
// 新增自主推广
export function delLoanMarke(query) {
    return request({
        url: '/api/loanMarke',
        method: 'delete',
        params: query
    })
}
// 获取自动分配
export function getCustomer(query) {
    return request({
        url: '/api/customer',
        method: 'get',
        params: query
    })
}
// 设置自动分配
export function setCustomer(query) {
    return request({
        url: '/api/customer',
        method: 'put',
        params: query
    })
}
// 分配详情
export function sendInfo(query) {
    return request({
        url: '/api/sendInfo',
        method: 'get',
        params: query
    })
}