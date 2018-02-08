import axios from 'axios'

const HttpProtptype = function () {}

HttpProtptype.install = function (Vue, options) {
  // 全局挂载 $http
  Vue.prototype.$http = axios
}

export default HttpProtptype
