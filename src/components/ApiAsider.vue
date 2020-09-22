<template>
    <div class="menu_container">
      <el-menu
        default-active="2"
        background-color="#ffffff"
        text-color="#2b2b2b"
        @select="select">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>全部接口</span>
          </template>
          <el-menu-item
          :index="val.id.toString()"
          v-for="val in AllApiMenu" :key='val.id'
          >{{val.apiName}}-->{{val.apiUrl}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>请求类型</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">
              <span class = "adjustSize">GET</span>
            </template>
            <el-menu-item
            :index="val.id.toString()"
            v-for="val in GetApiMenu" :key='val.id'
            >{{val.apiName}}-->{{val.apiUrl}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">
              <span class = "adjustSize">POST</span>
              </template>
            <el-menu-item
            :index="val.id.toString()"
            v-for="val in PostApiMenu" :key='val.id'
            >{{val.apiName}}-->{{val.apiUrl}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">
              <span class = "adjustSize">PUT</span>
            </template>
            <el-menu-item
            :index="val.id.toString()"
            v-for="val in PutApiMenu" :key='val.id'
            >{{val.apiName}}-->{{val.apiUrl}}
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
  import InterfaceApi from "@/api/InterfaceApi.js"
  export default{
    data(){
        return {
            AllApiMenu: [],
            GetApiMenu: [],
            PostApiMenu: [],
            PutApiMenu: [],
        }
    },
    mounted: function() {
      this.loadData();
      this.getAllTypeApiList();
    },
    methods: {
      //加载初始数据
      loadData (){
        this.getAllApiList();
      },
      // 获取全部接口列表
      getAllApiList () {
        InterfaceApi.getApiList()
          .then(res => {
            this.AllApiMenu = res.data;
          })
          .catch(err => {
            console.log(err)
          })
      },

      // 获取各分类接口列表
      getAllTypeApiList () {
        InterfaceApi.getApiListByType("GET")
          .then(res => {
            this.GetApiMenu = res.data;
          })
          .catch(err => {
            console.log(err)
          })

        InterfaceApi.getApiListByType("PUT")
          .then(res => {
            this.PutApiMenu = res.data;
          })
          .catch(err => {
            console.log(err)
          })

        InterfaceApi.getApiListByType("POST")
          .then(res => {
            this.PostApiMenu = res.data;
          })
          .catch(err => {
            console.log(err)
          })

      },

      select(key, keyPath){
        //向父组件中ApiAsider的@key方法中传入值key
        this.$emit('key',key);
      },
    }
  }
</script>

<style>
  .el-menu-item.is-active {
     color: #4a4a4a !important;
  }
  .menu_container{
    padding: 20px;
  }
  .el-menu-item{
    overflow: hidden;
    text-overflow:ellipsis;
    font-weight: 530;
  }
  .el-submenu{
    font-weight: 580;
  }
  .adjustSize{
    font-size: 12px;
  }
  .el-menu{
    box-shadow: 1px 1px 2px#ccc
  }
</style>
