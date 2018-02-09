
module.exports = {
  output: '/static/',
  modules: [
  {
    "module": "async",
    "components": [
      {
        name: 'Test',
        path: '/',
		url: '/src/components/Test.vue'
      },
      {
        name: 'compnentA',
        path: '/list',
		url: '/src/components/component-a.vue'
      },
      {
        name: 'compnentB',
        path: '/detail',
		url: '/src/components/component-b.vue'
      }
    ]
  },
  {
    "module": "outer",
    "components": [
      {
        name: 'Test',
        path: '/',
		url: '/src/components/Test.vue'
      },
      {
        name: 'compnentA',
        path: '/detail',
		url: '/src/components/component-a.vue'
      },
      {
        name: 'compnentA',
        path: '/detail',
		url: '/src/components/component-a.vue'
      }
    ]
  }
  ]
}

