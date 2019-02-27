import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
const Random = Mock.Random

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        'id|1-100': 100, 
        'count|1-100': 100, 
        name: "@title(5, 10)",
        phone: "@string('number', 11)",
        idcard: "@string('number', 17)",
        'uid|1-100': 100,
        radar: '@title(5, 7)',
        createAt: '@date("yyyy-yy-y MM:M:dd:d")',
    }))
}
export default {
    
    getCredit: config => {
        const { start, limit, name,phone,idcard,uid,radar,createdAt } = param2Obj(config.url)
        let mockList = List
        const pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    }
}


