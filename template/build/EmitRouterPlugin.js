/**
  * webpack插件的组成：
  * 一个JavaScript函数或者class（ES6语法）。
  * 在它的原型上定义一个apply方法。
  * 指定挂载的webpack事件钩子。
  * 处理webpack内部实例的特定数据。
  * 功能完成后调用webpack提供的回调
  * EmitFilePlugin
  * 导出组件的时候使用的插件
  * 主要是为了获得插件的导出hash
  * 如果配置了地址，可以直接将地址封装在导出地址的router配置上
  */
const fs = require('fs')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


function exportJson(data){
  // 输出文件
  var w_data = new Buffer(data)
  fs.writeFile(resolve('mocks/router.json'), w_data,{}, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('生成路由配置文件...')
    }
  })
}

class EmitRouterPlugin { 

  constructor(options){
    this.router = []
    this.module = options.module || ''
    this.url = options.url || 'http://localhost:8080/components/'
    this.routes = options.routes || []
  }


  // a method on prototype
  apply (compiler) {
  	let self = this
    // compiler是什么？compiler是webpack的'编译器'引用
    // compiler.plugin('***')和compilation.plugin('***')代表什么？
    // document.addEventListener熟悉吧？其实是类似的
    // compiler.plugin('***')就相当于给compiler设置了事件监听
	// 所以compiler.plugin('compile')就代表：当编译器监听到compile事件时，我们应该做些什么
    // compile（'编译器'对'开始编译'这个事件的监听）
    compiler.plugin("compile", function(params) {
      console.log("组件开始编译中...")
    })

    // compilation（'编译器'对'编译ing'这个事件的监听）
    compiler.plugin("compilation", function(compilation) {
      // 在compilation事件监听中，我们可以访问compilation引用，它是一个代表编译过程的对象引用
      // 我们一定要区分compiler和compilation，一个代表编译器实体，另一个代表编译过程
      // optimize('编译过程'对'优化文件'这个事件的监听)
      compilation.plugin("optimize", function() {
      })
    })

    // emit（'编译器'对'生成最终资源'这个事件的监听）
    compiler.plugin("emit", function(compilation, callback) {
      console.log("编译器正在输出文件...")
      let files = [];
      // compilation.chunks是块的集合（构建后将要输出的文件，即编译之后得到的结果）
      compilation.chunks.forEach(function(chunk) {
        // 最终生成的文件的集合
        chunk.files.forEach(function(filename) {
          // source()可以得到每个文件的源码
          // var source = compilation.assets[filename].source()
          // dealing this modules
          files.push(filename)
        })
      })

          // get Router json
      self.routes.forEach((route) => {
        let name = ''
        files.forEach((filename) => {
          if (filename.indexOf(route.component) > -1) {
            name = filename
          }
        })

        self.router.push({
          path: self.module + route.path,
          url: self.url+name
        })

      })

      exportJson(JSON.stringify(self.router))
      // callback在最后必须调用
      callback()
    })
  }

}
module.exports = EmitRouterPlugin
