import Mock from 'mockjs'
import { param2Obj } from '@/utils'


const Random = Mock.Random

export default{
    getApi: () => ({
        title: Random.csentence(5, 10),
        imgUrl: './static/images/logo.png',
        jsxxBg: './static/images/loginBg.jpg',
        state: 1
    })
}