const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  phone: state => state.user.phone,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  goldSum: state => state.user.goldSum, // 每单多少钱
  // 初始化数据
  initData: state => state.user.initData,
  // 金币
  gold: state => state.user.gold,
  group: state => state.user.group,
  id: state => state.user.id,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  
  
}
export default getters
