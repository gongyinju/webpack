// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import {HttpProtptype, AsyncComponent, JSLoader, CSSLoader} from './global'
import axios from 'axios'

// global plugin
Vue.use(HttpProtptype)
Vue.use(AsyncComponent)
Vue.use(JSLoader)
Vue.use(CSSLoader)
Vue.use(Vuetify)
Vue.config.productionTip = false


// global
if (window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') === '123')) {
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

const dynamicRouter = function (router, outerRouter) {
  try {
    outerRouter.forEach(function (item) {
      let path = '/' + item['path']
      router.addRoutes([
        {
          path: path,
          component: function (resolve) {
            loader(resolve, item['url'])
          }
        }
      ])
    })
  } catch (e) {
    throw new Error('你的个性化路由配置似乎出错了!')
  }
}

// 向服务器请求config配置
axios.get('http://localhost:8080/api/router',{}).then(function (result) {
  if(result.data.status == '000'){
    dynamicRouter(router, result.data.data)
  }
    /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}, function (error) {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
  // 没读取到配置 404
  throw new Error(error)
})
