<template>
      <el-container>
        <el-aside ><JobAsider @key="getKey"/></el-aside>
        <el-main><JobEidt :JobId="JobId"></JobEidt></el-main>
      </el-container>
</template>

<script>
  import JobAsider from '@/components/JobAsider.vue'
  import JobEidt from './JobEdit.vue'
  export default {
    data(){
        return {
          JobId:'1',
        }
    },
    components:{
        'JobAsider':JobAsider,
        'JobEidt':JobEidt,
      },
    watch: {
      JobId:function (val, oldVal){
        console.log("watch:"+this.JobId)
      }
    },
    mounted: function() {
    },
    methods:{
      getKey(key){
        this.JobId = key;
      }
    },
  }
</script>

<style>
.el-main{
  padding: 0px;
}
</style>
