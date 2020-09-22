<template>
  <div class="table_container">
    <el-row style="padding: 5px;width: 100%;">
      <el-col :span="24">
        <el-button type="success"
        style="float: right; margin-left: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        size="mini"
        >恢复所有</el-button>
        <el-button type="danger"
        style="float: right; margin-left: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        size="mini"
        >暂停所有</el-button>
        <el-button type="primary"
        style="float: right; margin-left: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        size="mini"
        >新建任务组</el-button>
        <el-button type="primary"
        style="float: right;margin-left: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        size="mini"
        @click="handleNew()"
        >新建任务</el-button>
      </el-col>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top:10px;"
        :row-class-name="tableRowClassName">
        <el-table-column
          label="id"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="group.name"
          label="任务组"
          :filters="groupList"
          :filter-method="filterGroup"
         >
          <template slot-scope="scope">
            <span >{{ scope.row.group.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="cron表达式"
          :filters="cronList"
          :filter-method="filterCron"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.cron }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          :filters="statusList"
          :filter-method="filterStatus"
          >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'CLOSE' ? 'danger' : 'success'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlePause(scope.$index, scope.row)">暂停</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleStart(scope.$index, scope.row)">恢复</el-button>


          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import JobApi from "@/api/JobApi.js"
  export default {
      data() {
        return {
          tableData: [],
          groupList:[],
          statusList:[],
          cronList:[],
          rowPauseList:[],
        }
      },
      mounted:function(){
          this.getAllJob();
          this.getAllGroup();
      },
      watch:{
        rowPauseList (newVal, oldVal) {
          // console.log(this.rowPauseList);
        }
      },
      methods: {
        filterCron(value, row){
          return row.cron === value;
        },
        filterStatus(value, row){
          return row.status === value;
        },
        filterGroup(value, row) {
          return row.group.name === value;
        },
        handleEdit(index, row) {
          this.$router.push({
            name: "jobList",
            params: { id: row.id.toString() },
          });
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        handleNew(){
          this.$router.push({
            name: "jobList",
          });
        },
        handlePause(index, row) {
          this.rowPauseList.push(index);
        },
        handleStart(index, row) {
          for(var i = 0;i<this.rowPauseList.length;i++){
            if(index==this.rowPauseList[i]){
              this.rowPauseList.splice(i,1);
            }
          }
        },
        getAllJob(){
          JobApi.getAllJob()
            .then(res=>{
              this.tableData=res.data;
              var statusList=[];
              var cronList=[];
              for(var i=0;i<res.data.length;i++){
                var status = {"text":"","value":""};
                var cron = {"text":"","value":""};
                status.text = res.data[i].status;
                status.value = res.data[i].status;
                cron.text = res.data[i].cron;
                cron.value = res.data[i].cron;
                statusList.push(status);
                cronList.push(cron);
              }
              this.statusList = statusList;
              this.cronList = cronList;
            })
            .catch(err => {
              console.log(err)
            })
        },
        getAllGroup(){
          JobApi.getAllGroup()
          .then(res=>{
            var groupList=[];
            for(var i=0;i<res.data.length;i++){
              var group = {"text":"","value":""};
              group.text = res.data[i].name;
              group.value = res.data[i].name;
              groupList.push(group);
            }
            this.groupList = groupList;
          })
          .catch(err => {
            console.log(err)
          })
        },
        tableRowClassName({row, rowIndex}) {
          console.log("表单加载class"+rowIndex);
          if(row.status == "CLOSE") {
            return 'pause-row';
          }
          return '';
        },

      }
    }
</script>

<style>
  .table_container{
    padding: 10px;
    margin: 20px;
    background-color: white;
    height: 90%;
    box-shadow: 1px 1px 5px#ccc;
  }
  .el-table .pause-row {
    background: #dddddd;
  }
</style>
