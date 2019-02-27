import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
const Random = Mock.Random
const SendList = []
for(let i = 0;i < count; i++) {
    List.push(Mock.mock({
        age: '@increment',
        qq: '@increment',
        id: '@increment',
        'cid|1-100': 100,
        realName: Random.cname(),
        mobile: "@string('number', 11)",
        idcard: "@string('number', 17)",
        sex: '@integer(0, 1)',
        loanYuan: '@integer(100, 10000)',
        idcardImg1: Random.dataImage('200x100', '正面'),
        idcardImg2: Random.dataImage('200x100', '反面'),
        idcardImg3: Random.dataImage('200x100', '手持'),
        zhimaScore: '@integer(100, 750)',
        hasJob: '@integer(1, 10)',
        contactName1: "@title(5, 10)",
        contactPhone1: "@string('number', 11)",
        contactName2: "@title(5, 10)",
        contactPhone2: "@string('number', 11)",
        ip: "@float(60, 100)",
        ipCity: "@title(1, 3)",
        refer: "@title(1, 3)",
        sendUid: 1243,
        examUid: 1244,
        finalCredit: null,
        vTags: [
            { vtagName: 'sdvsv', vtagUrl: 'yttyj'},
            { vtagName: 'dfvdfv', vtagUrl: 'uyujy'},
            { vtagName: 'dvdfv', vtagUrl: 'yyuj'},
            { vtagName: 'dvdfvdf', vtagUrl: 'yjyjy'},
        ],
        contact: [
            { contactName: 'aaa', contactPhone: 43215678 },
            { contactName: 'bbb', contactPhone: 7654321 }
        ],
        note: null,
        tags: ['按时所产生的', '导出的v', 'DVD许多V型的'],
        "state|1-9": 9,
        uid: "@string('number', 4)",
        createdAt: '@date("yyyy-yy-y MM:M:dd:d")',
        updatedAt: '@date("yyyy-yy-y MM :M:dd:d")',
        deletedAt: null,
        companyName: '@title(5, 7)',
        companyAddress: '@title(4, 8)',
        companyPhone: "@string('number', 11)",

    }))
}
for(let i = 0; i < count; i++) {
    SendList.push(Mock.mock({
        id: '@increment',
        cid: '@increment',
        uid: 1244,
        unitNum: "@string('number', 4)",
        useNum: "@string('number', 3)",
        ordNum: "@string('number', 3)",
        tags: ['按时所产生的','导出的v','DVD许多V型的'],
        createdAt: '@date("yyyy-yy-y MM:M:dd:d")',
        updatedAt: '@date("yyyy-yy-y MM:M:dd:d")',
        deletedAt: null
    }))
}
const isBoolean = Random.boolean()
export default{
    getOrder: config => {
        const { start, limit, Id, relName, phone, idcard, sex, zhimaScore, ipCity, refer, sendUid, examUid, vTags, note, state, createTime } = param2Obj(config.url)
        
        let mockList = List
        const pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    },
    getCustomer: () => ({
        autoSend: isBoolean
    }),
    setCustomer: () => ({
        data: 'success'
    }),
    getSendInfo: config => {
        const { start, limit, Id, uid, tags, createdAt } = param2Obj(config.url)
        let mockList = SendList
        let  pageList = mockList.filter((item, index) => index < limit * start && index >= limit * (start - 1))
        return {
            count: mockList.length,
            rows: pageList
        }
    },

}