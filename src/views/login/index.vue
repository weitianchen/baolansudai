<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">欢迎登录</h3>
        <div class="line"></div>
      </div>
      <el-form-item prop="jsxxName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="jsxxName" type="text" v-model="loginForm.jsxxName" autoComplete="on" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item prop="jsxxPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="jsxxPwd" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.jsxxPwd" autoComplete="on" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:10px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      <div class="clearfix">
        <!-- <el-button class="text-right rt" type="text">忘记密码</el-button> -->
      </div>
     

      <div class="tips">
        <span>{{$t('login.jsxxName')}} : admin</span>
        <span>{{$t('login.jsxxPwd')}} : {{$t('login.any')}}</span>
      </div>
    </el-form>
    <div class="title-box flex">
      <img :src="initData.imgUrl" alt="">
      <h2>{{initData.title}}</h2>
    </div>
    <div class="time-box">
      <h3>{{year}}年{{month}}月{{day}}日</h3>
      <p>{{week}} {{hour}}:{{min}}</p>
    </div>
    <el-dialog title="重置密码" width="350px" :visible.sync="dialogFormVisible">
      <el-form :model="resetForm">
        <el-form-item prop="jsxxName">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="jsxxName" type="text" v-model="resetForm.jsxxName" autoComplete="on" placeholder="请输入登录账号" />
        </el-form-item>

        <el-form-item prop="jsxxPwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="jsxxPwd" :type="passwordType" v-model="resetForm.newPassword" autoComplete="on" placeholder="请输入新密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item prop="jsxxPwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="jsxxPwd" :type="passwordType"  v-model="resetForm.againPassword" autoComplete="on" placeholder="请再次输入新密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item style="width: 200px;position: relative;" prop="jsxxPwd">
          <span class="svg-container">
            <svg-icon icon-class="code" />
          </span>
          <el-input style="width:150px;" name="code" v-model="resetForm.code" autoComplete="on" placeholder='请输入验证码'></el-input>
          <el-button style="position: absolute;right: -95px;top: 5px;" type="text" @click.prevent="sendCode()">发送验证码</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SocialSign from './socialsignin'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  components: { SocialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('密码不能小于2位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        jsxxName: '',
        jsxxPwd: ''
      },
      resetForm: {
        jsxxName: '',
        newPassword: '',
        againPassword: ''
      },
      loginRules: {
        jsxxName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        jsxxPwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      year: new Date().getFullYear(),
      month: (new Date().getMonth()) + 1,
      day: new Date().getDate(),
      week: '',
      hour: new Date().getHours(),
      min: new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes(),
      dialogFormVisible: false,
    }
  },
  methods: {
    sendCode() {

    },
    getWeek() {
      let week = ''
      const arrWeek = ['日', '一', '二', '三', '四', '五', '六']
      week = new Date().getDay()
      this.week = '周' + arrWeek[week]
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            location.reload()
            this.$router.push({ path: '/' })
          }).catch((err) => {
            this.$message.error(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    // 初始化页面
    let self = this
    
    self.$store.dispatch('Inithtml')
    self.getWeek()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  computed: {
    ...mapGetters([
      'initData'
    ])
  },
  watch: {
    initData() {
      let self = this
      document.title = self.initData.title
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#3581db;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #d9d9d9;
    background: #fff;
    border-radius: 5px;
    color: rgba(0,0,0,.65);
    &:hover{
      border: 1px solid #3581db;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#3581db;

.login-container {
  position: absolute;
  height: 100%;
  min-height: 800px;
  width: 100%;
  min-width: 1200px;
  // background-color: $bg;
  padding: 100px 0 100px 80px;
  background: url("../../assets/images/loginBg.jpg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  .login-form {
    width: 500px;
    height: 600px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    float: right;
    margin-right: 100px;
    border-radius: 15px;
    padding: 24px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 30px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      margin-top: 60px;
    }
    .line{
      border-radius: 8px;
      border: 3px solid #3581db;
      width: 121px;
      margin: 20px auto 100px;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .title-box{
    img{
      height: 36px;
    }
    h2{
      font-size: 36px;
      font-weight: 600;
      color: #fff;
      margin-left: 20px;
      line-height: 36px;
    }
  }
  .time-box{
    position: absolute;
    left: 80px;
    bottom: 155px;
    font-size: 18px;
    color: #fff;
  }
}
</style>
