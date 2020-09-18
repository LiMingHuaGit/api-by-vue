<template>
  <div id="app">
<!--    <el-container>
      <el-container>
        <el-container>
          <el-header><Header/></el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer><Footer/></el-footer>
        </el-container>
      </el-container>
    </el-container> -->
    <el-container>
      <el-header><Header/></el-header>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    components:{
        'Header': Header,
        'Footer': Footer,
      },
  }
</script>

<style>
#app{
  height: 100%;
}
.el-header {
  background-color: #2D333f;
  height: 7% !important;
  padding:0;
}
.header{
  height: 100% !important;
}

.el-footer {
  background-color: white;
  color: #333;
  line-height: 80px;
  height: 5% !important;
}

.el-main {
  background-color: #F5F7FA;
  color: #333;
  height: 100% !important;
}
.el-aside {
  background-color: #F5F7FA;

}

.el-container {
  height: 100%;
}
</style>
