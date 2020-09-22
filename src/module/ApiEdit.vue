<template>
  <div class="form_container">

    <el-form ref="form" :inline="true" :model="form" label-position="left" label-width="80px">
      <el-col :span="24">
          <el-button-group class="topButton">
            <el-button  icon="el-icon-edit" size="medium" plain @click="editData">编辑信息</el-button>
            <el-button  icon="el-icon-finished" size="medium" plain @click="saveData">保存</el-button>
            <el-button  icon="el-icon-delete" size="medium" plain @click="deletData">删除</el-button>
          </el-button-group>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口名称">
          <el-input v-model="form.apiName" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请求类型">
            <el-tag
              type="success"
              effect="plain">
              -&nbsp{{form.apiType}}&nbsp-
            </el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请求路径">
          <!-- <el-input v-model="form.apiUrl"></el-input> -->
          <span>{{form.apiUrl}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口开关">
          <!-- <el-input v-model="form.apiSwitch"></el-input> -->
          <el-switch
            ref="apiSwitch"
            v-model="form.apiSwitch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="关闭"
            @change="apiSwitchChanged">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口描述">
          <el-input v-model="form.apiDescription" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口标签">
          <!-- <el-input v-model="form.apiTag" :disabled="isdisabledAll"></el-input> -->
          <el-tag
            effect="dark">
            -&nbsp{{form.apiTag.tagName}}&nbsp-
          </el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口函数">
          <!-- <el-input v-model="form.apiMethod"></el-input> -->
          <span>{{form.apiMethod}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="类路径">
          <!-- <el-input v-model="form.apiClassName"></el-input> -->
           <span>{{form.apiClassName}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="返回Body">
        </el-form-item>
        <el-input
          :autosize="{ minRows: 5}"
          type="textarea"
          :rows="2"
          v-model="form.apiResponse" :disabled="isdisabledAll">
        </el-input>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import InterfaceApi from "@/api/InterfaceApi.js"
  export default{
    name: "ApiEdit",
    props: {
      ApiId: {
        type: String,
        required: true
      },
    },
    components:{
    },
    data(){
        return {
          isdisabledAll:true,
          form: {
                  apiClassName: '',
                  apiDescription: '',
                  apiMethod: '',
                  apiName: '',
                  apiSwitch: 0,
                  apiType: '',
                  apiUrl: '',
                  id: '',
                  apiTag:{
                    id:'',
                    tagName:""
                  },
                  apiResponse:'',
                  },
        }
    },
    mounted: function() {
      this.getApiEdit();
    },
    watch: {
      ApiId:function (val, oldVal){
        this.getApiEdit();
      }
    },
    methods: {
      // 获取详情列表
      getApiEdit () {
        InterfaceApi.getApiById(this.ApiId)
          .then(res => {
            this.form = res.data;
            console.log(this.form)
          })
          .catch(err => {
            console.log(err)
          })
      },
      //开关接口
      apiSwitchChanged(){
        console.log(this.$refs.apiSwitch.value);
        this.$confirm('此操作将改变接口可用状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          InterfaceApi.changeSwitch(this.ApiId,this.$refs.apiSwitch.value)
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
          .catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //编辑页面表单数据
      editData(){
        this.isdisabledAll = false;
      },
      //保存数据
      saveData(){
        this.$confirm('确认保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.form)
          InterfaceApi.updateApiById(this.form)
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
          .catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
        this.isdisabledAll = true;
      },
      deletData(){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          InterfaceApi.deleteApiById(this.form.id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // location.reload()
            this.$router.go(0)
          })
          .catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

    }
  }
</script>

<style>
.form_container{
  padding: 20px;
  margin: 20px;
  background-color: white;
  height: 90%;
  box-shadow: 1px 1px 5px#ccc;
}
.topButton{
  position:relative;
  right:-80%;
  top:-1rem;
}
</style>
