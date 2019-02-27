import request from '@/utils/request'

// 网站初始化访问请求
export function initHtml() {
    return request({
        url: '/api/jsxxSetting',
        method: 'get'
    })
}