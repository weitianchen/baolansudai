import request from '@/utils/request'

// 获取账号列表
export function getUser(query) {
    return request({
        url: '/api/user',
        method: 'get',
        params: query
    })
}
// 更新账号列表
export function putUser(query) {
    return request({
        url: '/api/user',
        method: 'put',
        params: query
    })
}
// 新增账号列表
export function postUser(query) {
    return request({
        url: '/api/user',
        method: 'post',
        data: query
    })
}
// 删除账号
export function delUser(query) {
    return request({
        url: '/api/user',
        method: 'delete',
        params: query
    })
}
// 查询账号是否存在
export function isName(query) {
    return request({
        url: '/api/isName',
        method: 'get',
        params: query
    })
}
