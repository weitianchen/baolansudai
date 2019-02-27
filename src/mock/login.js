import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const Random = Mock.Random

const userMap = {
  admin: {
    permission: ['admin','aaa'],
    gold: 40,
    Id: 545152,
    group: [{
      Id: 1243 ,
      name: "老张"
    },
    {
      Id: 1244 ,
      name: "老李"
    }],
    token: 'admin',
    jsxxName: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    jsxxReal: 'Super Admin1'
  },
  editor: {
    permission: ['editor'],
    token: 'editor',
    jsxxName: 'editor',
    gold: 40,
    Id: 545152,
    group: [{
      Id: 1243,
      name: "老张"
    },
    {
      Id: 1244,
      name: "老李"
    }],
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    jsxxReal: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { jsxxName } = param2Obj(config.url)
    return userMap[jsxxName]
    // return userMap['admin']
  },
  getUserInfo: config => {
    const { jsxxName } = param2Obj(config.url)
    if (userMap[jsxxName]) {
      return userMap[jsxxName]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
