import axios from 'axios'
const host = 'http://localhost:8888'

export default {
  //获取任务组
  getAllGroup() {
      return axios.get(`${host}/job/query/group/all`)
  },
  //根据任务组获取任务列表
  getJobListByGroup(id) {
      let url = "/job/query/job/group/"
      return axios.get(host+url+id)
  },
  //获取按任务组分类的任务列表
  getGroupWithJobList(){
      return axios.get(`${host}/job/query/job/jobListByGroup`)
  },
  getAllJob(){
      return axios.get(`${host}/job/query/all`)
  },
  //根据接口id获取接口详情
  getApiById(id) {
      let url = "/api/query/id?id="
      return axios.get(host+url+id)
  },
  //根据任务id获取任务详情
  getJobEdit(id) {
      return axios.get(`${host}/job/query/id?id=`+id)
  },
  //更新job
  updateJobById(form){
      let data = new FormData()
      data.append('id',form.id)
      data.append('name',form.name)
      data.append('group.id',form.group.id)
      data.append('group.name',form.group.name)
      data.append('group.description',form.group.description)
      data.append('cron',form.cron)
      data.append('jarPath',form.jarPath)
      data.append('vmParam',form.vmParam)
      data.append('status',form.status)
      data.append('parameter',form.parameter)
      let url = "/job/update/job"
      return axios.post(host+url,data)
  },
  //根据id刷新任务
  refreshJob(id){
      return axios.get(`${host}/job/refresh/`+id)
  },
  //刷新所有任务
  refreshAll(){
      return axios.get(`${host}/job/refresh/all`)
  },
  //根据id暂停任务
  pauseJob(id){
      return axios.get(`${host}/job/pause/`+id)
  },
  //暂停所有任务
  pauseAll(){
      return axios.get(`${host}/job/pause/all`)
  },
  //根据id恢复任务
  resumeJob(id){
      return axios.get(`${host}/job/resume/`+id)
  },
  //恢复所有任务
  resumeAll(){
      return axios.get(`${host}/job/resume/all`)
  },
}
