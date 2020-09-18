<template>
      <el-container>
        <el-aside ><ApiAsider  @key="getKey"/></el-aside>
        <el-main><ApiEdit :ApiId="ApiId"></ApiEdit></el-main>
      </el-container>
</template>

<script>
  import ApiEdit from '@/module/ApiEdit.vue'
  import ApiAsider from '@/components/ApiAsider.vue'
  export default{
    data(){
        return {
          ApiId:'1',
        }
    },
    components:{
      'ApiEdit':ApiEdit,
      'ApiAsider':ApiAsider,
    },
    watch: {
      ApiId:function (val, oldVal){
        // console.log("watch:"+this.ApiId)
      }
    },
    mounted: function() {
    },
    methods:{
      getKey(key){
        this.ApiId = key;
      }
    },
  }
</script>

<style>
.el-main{
  padding: 0px;
}
</style>
