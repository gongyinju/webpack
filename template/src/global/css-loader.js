const CSSLoader = {
  name: 'css-loader',
  render (createElement) {
    var self = this
    if (!window.istore.getItemLocal(this.url)) {
      return createElement('link', {
        attrs: {type: 'text/css', rel: 'stylesheet', href: self.url},
        on: {
          load: function () {
            window.istore.setItemLocal(self.url, 'loaded')
          }
        }
      })
    }
  },
  props: {
    url: { type: String, required: true }
  }
}

CSSLoader.install = function (Vue) {
  Vue.component(CSSLoader.name, CSSLoader)
}

export default CSSLoader
