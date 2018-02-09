const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const outerComponents = require('../config/outerComponents')
const S3Plugin = require('./S3Plugin')
const fs = require('fs')

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function resolveComponents(modules){
  let entry = {}
  modules.forEach((module) => {
    module.components.forEach((item) => {
      if (!entry[item.name]) {
        entry[item.name] = resolve(item.url)
      }
    })
  })
  return entry
}

function createRouterJson (compilation) {
  var chunk = compilation.chunks[0]
  var jsFile = chunk.files[0]
  console.log(chunk)
}

function complyCallback (files) {
  console.log('你的组件已经输出文成，输出路径在:'+outerComponents.output+'目录下')
  let router = []
  outerComponents.modules.forEach((configModule) => {
    let routerModule = {
      module: configModule.module,
      router: []
    }
    configModule.components.forEach((configComponent) => {
      let name = ''
      files.forEach((filename) => {
        if (filename.indexOf(configComponent.name)) {
          name = filename
        }
      })
      routerModule.router.push({
        path: configComponent.path,
        url: name
      })
    })
    router.push(routerModule)
  })
  writeJson(JSON.stringify(router))
}

function writeJson (data) {
  var w_data = new Buffer(data)
  fs.writeFile(resolve('server/mocks/router.json'), w_data,{}, function (err) {
    if (err) {
      console.error(err)
    } else {
      // console.log('你的独立组件已经写入server/mocks/router.json文件中，请根据需要进行优化')
    }
  })
  fs.writeFile(resolve(outerComponents.output+'/router.json'), w_data,{}, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('你的独立组件已经写入'+outerComponents.output+'文件夹的router.json文件中，请根据需要进行优化')
    }
  })
}

module.exports = {
  entry: resolveComponents(outerComponents.modules),
  output: {
    path: resolve(outerComponents.output),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'vuetify': 'Vuetify',
    'axios': 'axios'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: false, // vue-loader v13 更新 默认值为 true v12及之前版本为 false, 此项配置影响 vue 自身异步组件写法以及 webpack 打包结果
          loaders: utils.cssLoaders({
            sourceMap: true,
            extract: false          // css 不做提取
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(resolve(outerComponents.output)),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new S3Plugin(complyCallback),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: false,
    //   sourceMap: true
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
}
