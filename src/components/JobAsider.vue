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
            <span>全部任务</span>
          </template>
          <el-menu-item
          v-for="job in allJobList" :key='job.id'
          :index='job.id.toString()'>
            {{job.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>任务组</span>
          </template>
          <el-submenu
          v-for="group in groupWithJobList":key='group.groupId'
          :index= 'group.groupIndex.toString()'>
            <template slot="title">
              <span class = "adjustSize" >{{group.groupName}}</span>
            </template>
            <el-menu-item
            v-for="job in group.jobList":key='job.id'
            :index='job.id.toString()'>
              {{job.name}}
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
  import JobApi from "@/api/JobApi.js"
  export default{
    data(){
      return{
        groupWithJobList:[],
        allJobList:[],
      }
    },
    mounted:function(){
        this.getGroupWithJobList();
        this.getAllJob();
    },
    computed:{

    },
    methods:{
      getGroupWithJobList(){
        JobApi.getGroupWithJobList()
          .then(res=>{
            console.log(res.data);
            this.groupWithJobList=res.data;

          })
          .catch(err => {
            console.log(err)
          })
      },
      getAllJob(){
        JobApi.getAllJob()
          .then(res=>{
            console.log(res.data);
            this.allJobList=res.data;

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
</style>
