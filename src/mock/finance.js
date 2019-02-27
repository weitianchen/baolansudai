import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const logCoinList = []
const count = 100
for (let i = 0; i < count; i++) {
    logCoinList.push(Mock.mock({
        perCoin: "(15金币/单)",
        'id|1-100': 100,
        "cid|1-100": 100,
        title: '@title(2, 3)',
        'inout|1-10': 10,
        'ordNum|1-50': 50,
        'coinNum|1-50': 50,
        relNo: "@title(1, 2)",
        "relType|1-5": 5,
        state: '1',
        createdAt: '@date("yyyy-yy-y MM:M:dd:d")',
        
    }))
}
export default {
    getlogCoin: config => {
        const { start, limit, Id, title, inout, relType, createdAt } = param2Obj(config.url)
        let mockList = logCoinList
        const pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    }
}


