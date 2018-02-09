/**
  * webpack插件的组成：
  * 一个JavaScript函数或者class（ES6语法）。
  * 在它的原型上定义一个apply方法。
  * 指定挂载的webpack事件钩子。
  * 处理webpack内部实例的特定数据。
  * 功能完成后调用webpack提供的回调
  */
class S3Plugin { 
  
  constructor(props){
    this.callback = props
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
      console.log("编译器正在对组件进行处理...")
      // 在compilation事件监听中，我们可以访问compilation引用，它是一个代表编译过程的对象引用
      // 我们一定要区分compiler和compilation，一个代表编译器实体，另一个代表编译过程
      // optimize('编译过程'对'优化文件'这个事件的监听)
      compilation.plugin("optimize", function() {
        console.log("编译器正在优化组件中...")
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

      // callback在最后必须调用
      typeof self.callback === 'function' && self.callback(files)
    })
  }
} 
module.exports = S3Plugin
