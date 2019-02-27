import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import baseAPI from './base'
import orderAPI from './order'
import flowAPI from './flow'
import financeAPI from './finance'
import accountAPI from './account'
import creditAPI from './riskManagement'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/api\/login/, 'get', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/api\/existence/, 'get', loginAPI.getUserInfo)

// // 文章相关
// Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
// Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
// Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// // 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// // 账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// // 订单
// Mock.mock(/\/api\/loanApply/, 'get', orderAPI.getOrder)
// Mock.mock(/\/api\/customer/, 'get', orderAPI.getCustomer)
// Mock.mock(/\/api\/customer/, 'put', orderAPI.setCustomer)
// Mock.mock(/\/api\/sendInfo/, 'get', orderAPI.getSendInfo)

// // 流量管理
// Mock.mock(/\/api\/flowInfo/, 'get', flowAPI.getSystem)
// Mock.mock(/\/api\/flowInfo/, 'put', flowAPI.setSystem)
// Mock.mock(/\/api\/loanMarke/, 'get', flowAPI.getLoanMarke)

// // 金币管理
// Mock.mock(/\/api\/logCoin/, 'get', financeAPI.getlogCoin)

// // 账号管理
// Mock.mock(/\/api\/user/, 'get', accountAPI.getUser)

// // 查询记录
// Mock.mock(/\/api\/credit/, 'get', creditAPI.getCredit)


// // 初始化页面
// Mock.mock(/\/api\/jsxxSetting/,'get', baseAPI.getApi)



export default Mock
