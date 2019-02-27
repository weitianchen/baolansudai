<template>
  <div class="dashboard-editor-container">
    <h1>你好,{{name}},欢迎登陆{{title}}管理后台</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'dashboard-admin',
  components: {},
  data() {
    return {
      title: ''
    }
  },
  created() {
    if(Cookies.get('initTitle')) {
      this.title = Cookies.get('initTitle')
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'email',
      'uid',
      'introduction',
      'roles'
    ])
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
  min-height: 100vh;
  margin-top: -50px;
  padding: 100px 60px 0px;
  text-align: center;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
