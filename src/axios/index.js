import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 60000
})
// 统一处理ajax失败
axiosInstance.interceptors.response.use(function (res) {
  const response = res.data
  if (
    response.status !== '100' &&
    typeof response.errorMessges !== 'undefined' &&
    Object.prototype.toString.call(response.errorMessges) === '[object Array]'
  ) {
    alert(response.errorMessges[0].message.trim())
    return
  }
  return res
}, function (error) {
  alert('网络中断了，请重试')
  return Promise.reject(error)
})
// 用于移动端页面
window.axios = axiosInstance
