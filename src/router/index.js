import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]


// 权限 a 订单管理 b 流量管理  c  风控管理 d 财务管理 e 账号管理

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/orderManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'orderManagement',
    meta: { title: '订单管理', icon: 'documentation', roles: ['a'] },
    children: [
      {
        path: 'allOrders',
        component: _import('orderManagement/allOrders'),
        name: 'allOrders',
        meta: { title: '全部订单' }
      },
      {
        path: 'undistributedOrders',
        component: _import('orderManagement/undistributedOrders'),
        name: 'undistributedOrders',
        meta: { title: '未分配' }
      },
      {
        path: 'auditOrders',
        component: _import('orderManagement/auditOrders'),
        name: 'auditOrders',
        meta: { title: '审核中' }
      },
      {
        path: 'passedOrders',
        component: _import('orderManagement/passedOrders'),
        name: 'passedOrders',
        meta: { title: '已通过' }
      },
      {
        path: 'refusedOrders',
        component: _import('orderManagement/refusedOrders'),
        name: 'refusedOrders',
        meta: { title: '已拒绝' }
      },
      {
        path: 'orderDetail',
        component: _import('orderManagement/orderDetail'),
        name: 'orderDetail',
        hidden: true,
        meta: { title: '订单详情' }
      },
    ]
  },
  {
    path: '/flowManagement',
    component: Layout,
    name: 'flowManagement',
    meta: { title: '流量管理', icon: 'flow', roles: ['b'] },
    children: [
      {
        path: 'systemPromotion',
        component: _import('flowManagement/systemPromotion'),
        name: 'systemPromotion',
        meta: { title: '系统推广' }
      },
      {
        path: 'autonomouslyPromotion',
        component: _import('flowManagement/autonomouslyPromotion'),
        name: 'autonomouslyPromotion',
        meta: { title: '自主推广' }
      },
      {
        path: 'allotDetail',
        component: _import('flowManagement/allotDetail'),
        name: 'allotDetail',
        meta: { title: '分配详情' }
      },
      {
        path: 'collectionManagement',
        component: _import('flowManagement/collectionManagement'),
        name: 'collectionManagement',
        meta: { title: '催收管理' }
      }
    ]
  },
  {
    path: '/investmentManagement',
    component: Layout,
    name: 'investmentManagement',
    meta: { title: '风控管理', icon: 'documentation', roles: ['c'] },
    children: [
      {
        path: 'searchBlacklist',
        component: _import('investmentManagement/searchBlacklist'),
        name: 'searchBlacklist',
        meta: { title: '黑名单查询' }
      },
      {
        path: 'queryLog',
        component: _import('investmentManagement/queryLog'),
        name: 'queryLog',
        meta: { title: '查询记录' }
      }
    ]
  },
  {
    path: '/financialManagement',
    component: Layout,
    name: 'financialManagement',
    meta: { title: '财务管理', icon: 'financial', roles: ['d'] },
    alwaysShow: true,
    children: [{
      path: 'goldRecord',
      component: _import('financialManagement/goldRecord'),
      name: 'goldRecord',
      meta: { title: '金币记录' }
    }]
  },
  {
    path: '/accountManagement',
    component: Layout,
    name: 'accountManagement',
    meta: { title: '账户管理', icon: 'user', roles: ['e'] },
    children: [
      {
        path: 'accountHistory',
        component: _import('accountManagement/accountHistory'),
        name: 'accountHistory',
        meta: { title: '账号记录' }
      },
      {
        path: 'logOut',
        component: _import('accountManagement/logOut'),
        name: 'logOut',
        meta: { title: '退出登录', noCache: true }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: '图标', icon: 'icon', noCache: true }
    }]
  },
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //     { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
