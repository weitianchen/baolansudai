<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App'
  }
</script>
<style lang="scss">
  .pswp{
    z-index: 2500  !important;
  }
  
  .pswp__button.pswp__button--rotate{
    background: url("./assets/images/default-skin.png") 0 0 no-repeat  !important;
    background-size: 264px 88px;
    width: 44px;
    height: 44px;
     background-position: -176px 0  !important;
  }
</style>