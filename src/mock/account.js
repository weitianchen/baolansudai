import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
const Random = Mock.Random
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        jsxxName: "@string('number', 11)",
        jsxxPwd: "123456",
        jsxxReal: "管理员",
        'gold|1-100': 100,
        permission: ['b','c'],
        createId: '@increment',
        createTime: '@date("yyyy-yy-y MM:M:dd:d")',
        loginTime: '@date("yyyy-yy-y MM:M:dd:d")',
    }))
}
export default {
    getUser: config => {
        const { start, limit, id, jsxxName, jsxxReal } = param2Obj(config.url)

        let mockList = List
        const pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    },
}