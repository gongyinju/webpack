const JSLoader = {
  name: 'js-loader',
  render (createElement) {
    var self = this
    if (!window.istore.getItemLocal(this.url)) {
      return createElement('script', {
        attrs: {
          type: 'text/javascript', src: self.url
        },
        on: {
          load: function () {
            window.istore.setItemLocal(self.url, 'loaded')
            self.$emit('load')
          }
        }
      })
    }
  },
  props: {
    url: { type: String, required: true },
    callback: {type: Function}
  }
}

JSLoader.install = function (Vue) {
  Vue.component(JSLoader.name, JSLoader)
}

export default JSLoader
