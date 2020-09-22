import axios from 'axios'
const host = 'http://localhost:8888'

export default {
  //获取接口列表
  getApiList() {
      return axios.get(`${host}/api/query/all`)
  },
  //根据接口请求类型获取接口列表
  getApiListByType(type) {
      let url = "/api/query/apiType?apiType="
      return axios.get(host+url+type)
  },
  //根据接口id获取接口详情
  getApiById(id) {
      let url = "/api/query/id?id="
      return axios.get(host+url+id)
  },
  //根据接口id更新接口开关状态
  changeSwitch(id,apiSwitch) {
      let data = new FormData()
      data.append('apiId',id)
      data.append('apiSwitch',apiSwitch)
      let url = "/api/update/apiSwitch"
      return axios.post(host+url,data)
  },
  updateApiById(form){
      let data = new FormData()
      data.append('id',form.id)
      data.append('apiName',form.apiName)
      data.append('apiClassName',form.apiClassName)
      data.append('apiDescription',form.apiDescription)
      data.append('apiMethod',form.apiMethod)
      data.append('apiSwitch',form.apiSwitch)
      data.append('apiType',form.apiType)
      data.append('apiUrl',form.apiUrl)
      data.append('apiTag.id',form.apiTag.id)
      data.append('apiTag.tagName',form.apiTag.tagName)
      data.append('apiResponse',form.apiResponse)
      data.append('apiDescription',form.apiDescription)
      let url = "/api/update/updateApiById"
      return axios.post(host+url,data)
  },
  deleteApiById(id){
    let data = {
      "id":id
    }
    let url = "/api/delete/deleteApiById"
    return axios.post(host+url,data)
  },
}
