<template>
  <div>
    <el-menu
      class="head-menu"
      mode="horizontal"
      router
      text-color="#bdbdbd"
      background-color="#2D333f"
      >
      <el-image
        :src="logo"
        style="width:10%"
        >
      </el-image>
      <el-menu-item index="/" class="header-title">首页</el-menu-item>
      <el-menu-item index="apiList" class="header-title">接口管理</el-menu-item>
      <el-menu-item index="jobList" class="header-title">定时任务管理</el-menu-item>
      <el-menu-item index="log" class="header-title">任务实时日志</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  export default{
    data () {
      return {
        logo: logo
      }
    }
  }
</script>

<style>
  .head-menu{
    height: 65px;
    width: 100% !important;
    font-weight:444;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    color: #fff !important;
    border-bottom: 3px solid #d0d0d0 !important;
  }
  .header-title{
    left: 500px;
    height: 100% !important;
    width: 150px;
    text-align: center;
    font-size: 17px;
  }
  .el-image{
    position:absolute;
    left:10px;
    top:10px;
    z-index:1;
    align-items: center;
  }
</style>
