<template>
  <div class="form_container">

    <el-form ref="form" :inline="true" :model="form" label-position="left" label-width="80px">
      <el-col :span="24">
          <el-button-group class="topButton">
            <el-button  icon="el-icon-edit" size="medium" plain @click="editData">编辑信息</el-button>
            <el-button  icon="el-icon-finished" size="medium" plain @click="saveData">保存</el-button>
            <el-button  icon="el-icon-delete" size="medium" plain >删除</el-button>
          </el-button-group>
      </el-col>
      <el-col :span="12">
        <el-form-item label="任务名称">
          <el-input v-model="form.name" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="任务组">
            <el-tag
              type="success"
              effect="plain">
              -&nbsp{{form.group.name}}&nbsp-
            </el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="cron公式">
          <el-input v-model="form.cron" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="任务开关">
          <el-switch
            ref="apiSwitch"
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="OPEN"
            inactive-value="CLOSE"
            active-text="开启"
            inactive-text="关闭"
            @change="jobSwitchChanged">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="任务描述">
          <el-input v-model="form.description" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="jar包路径">
           <el-input v-model="form.jarPath" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="元数据">
          <el-input v-model="form.parameter" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="vm参数">
          <el-input v-model="form.vmParam" :disabled="isdisabledAll"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import JobApi from "@/api/JobApi.js"
  export default{
    name: "JobEdit",
    props: {
      JobId: {
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
            id: '',
            name: '',
            parameter: '',
            status: '',
            vmParam: 0,
            jarPath: '',
            cron: '',
            description: '',
            group:{
              description:'',
              id:"",
              name:"",
            },
          },
        }
    },
    mounted: function() {
      this.getJobEdit();
    },
    watch: {
      JobId:function (val, oldVal){
        this.getJobEdit();
      }
    },
    methods: {
      // 获取详情列表
      getJobEdit() {
        JobApi.getJobEdit(this.JobId)
          .then(res => {
            this.form = res.data;
            console.log(this.form)
          })
          .catch(err => {
            console.log(err)
          })
      },
      //开关任务
      jobSwitchChanged(){
        console.log(this.$refs.apiSwitch.value);
        this.$confirm('将更改任务执行状态, 是否继续?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          JobApi.updateJobById(this.form)
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            JobApi.refreshJob(this.form.id)
            .then(res => {
                console.log(res);
            })
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
      //保存页面表单数据
      saveData(){
        console.log(this.$refs.apiSwitch.value);
        this.$confirm('是否保存?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          JobApi.updateJobById(this.form)
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
