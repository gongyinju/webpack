// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import {HttpProtptype, AsyncComponent, JSLoader, CSSLoader} from './global'
import axios from 'axios'
import('./../node_modules/vuetify/dist/vuetify.min.css')

// global
if (window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') === 123)) {
  window.istore = {
    getItemLocal (key) {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
      } else {
        return undefined
      }
    },
    setItemLocal (key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    removeItemLocal (key) {
      localStorage.removeItem(key)
    }
  }
} else {
  let storage = {}
  window.localStorageCache = {}
  storage.setItemLocal = function (key, value) {
    window.localStorageCache[key] = value
  }
  storage.getItemLocal = function (key) {
    return window.localStorageCache[key]
  }
  storage.removeItemLocal = function (key) {
    delete window.localStorageCache[key]
  }
  window.istore = storage
}

// global plugin
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(HttpProtptype)
Vue.use(AsyncComponent)
Vue.use(JSLoader)
Vue.use(CSSLoader)
Vue.config.productionTip = false

// dynamic router
const loader = function (resolve, url) {
  if (!window.istore.getItemLocal[url]) {
    axios.get(url).then(function (res) {
      let asyncCom = new Function(`return ${res.data}`)()
      window.istore.setItemLocal(url, asyncCom)
      resolve(asyncCom)
    })
  } else {
    resolve(window.istore.getItemLocal[url])
  }
}

const dynamicRouter = function (router, outerModules) {
  try {
    outerModules.forEach(function (outModule) {
      let module = outModule.module
      let outerRouter = outModule.router
      outerRouter.forEach(function (item) {
        let path = '/' + module + item['path']
        router.addRoutes([
          {
            path: path,
            component: function (resolve) {
              loader(resolve, item['url'])
            }
          }
        ])
      })
    })
  } catch (e) {
    throw new Error('你的个性化路由配置似乎出错了!')
  }
}

const contextPath = (function () {
  let pathName = window.location.pathname
  let pathAry = pathName.split('/')
  if (pathAry.length > 2) {
    return pathAry[1]
  } else {
    return ''
  }
})()

// 向服务器请求config配置
axios.get('http://localhost:3000/api/router').then(function (result) {
  console.log(result)
  dynamicRouter(router, result.data)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}, function (error) {
  // 没读取到配置 404
  throw new Error(error)
})
