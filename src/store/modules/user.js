import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { initHtml } from '@/api/base'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    phone: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    initData: {},
    gold: 0,
    group: [],
    id: 0
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INITDATA: (state, initData) => {
      state.initData = initData
    },
    SET_GOLD: (state, gold) => {
      state.gold = gold
    },
    SET_GROUP: (state, group) => {
      state.group = group
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_PHONE: (state,phone) => {
      state.phone = phone
    },
    SET_GLODSUM: (state, sum) => {
      state.goldSum = sum
    }
  },

  actions: {
    // 初始化页面数据
    Inithtml({ commit }){
      initHtml().then(res => {
        let data = res.data
        Cookies.set('initTitle', data.title)
        Cookies.set('initLogin', data.imgUrl)
        document.title = data.title
        commit('SET_INITDATA',data)
        commit('SET_GLODSUM',data.query)
      }).catch(error => {
        console.log(error)
      })
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.jsxxName.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.jsxxPwd).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          commit('SET_PHONE', userInfo.jsxxName)
          Cookies.set('jsxxName', userInfo.jsxxName)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        
        getUserInfo({ jsxxName: Cookies.get('jsxxName')}).then(response => {
          if (response.code != 200) { 
            reject('error')
          }
          const data = response.data
          commit('SET_GOLD', data.gold)
          commit('SET_GROUP', data.group)
          commit('SET_ID',data.Id)
          Cookies.set('Id',data.Id)
          
          if (data.permission && data.permission.length > 0) { // 验证返回的roles是否是一个非空数组
            let roles =  data.permission.split(",")
            commit('SET_ROLES', roles)
          } else {
            reject('权限不能为空，请设置权限')
          }
          commit('SET_NAME', data.jsxxReal)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.permission)
          commit('SET_NAME', data.jsxxReal)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
