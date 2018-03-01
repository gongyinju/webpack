/**
 * 路由配置
 *
 */
module.exports = {
  url: 'http://localhost:8080/components/', 
  module: 'async',
  routes: [
    {
      path: '/',
      component: 'asyncComponent',
      dir: 'src/components/asyncComponent.vue'
    },
    {
      path: '/list',
      component: 'asyncList',
      dir:  'src/components/asyncList.vue'
    }
  ]
}