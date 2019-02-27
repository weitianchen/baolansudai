import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const LoanMarkeList = []
const count = 100
const Random = Mock.Random

for(let i = 0; i< count; i++){
    LoanMarkeList.push(Mock.mock({
        restMoney: "@title(5, 10)",
        goUrl: "@title(5, 7)",
        admUrl: "@title(5, 6)",
        'id|1-100': 100,
        'cid|1-100': 100,
        title: '@title(2, 3)',
        channel: '@title(2, 3)',
        note: null,
        'byUid|1-100': 100,
        appName: '@title(2, 3)',
        logo: null,
        bannerUrl: "@title(2, 3)",
        goUrl: "https://www.zfd101.com/loan-v3/#/?c=ccc&entry_id=2",
        admUrl: "https://www.zfd101.com/app/ccc-statis-223-1541416744000#/channel-info?d=1",
        'appTpl|1-10': 10,
        feeType: 0,
        'price|1-100': 100,
        'regNum|1-40': 40,
        'ordNum|1-30': 30,
        totalPaid: null,
        'totalPrice|1-100': 100,
        state: 2,
        createdAt: '@date("yyyy-yy-y MM:M:dd:d")',
        updatedAt: '@date("yyyy-yy-y MM :M:dd:d")',
    }))
}
export default{
    getSystem: () => ({
        dayNumMax: 100,
        dayNumMin: 0,
        id: 50,
        perCoin: 13,
        state: 1,
        zmfStart: 600,
    }),
    setSystem: () => ({
        data: 'success'
    }),
    getLoanMarke: config => {
        const { start, limit, Id, title, channel, byUid, appNmae, feeType, state, createdAt} = param2Obj(config.url)
        let mockList = LoanMarkeList
        const pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    }
}

  
