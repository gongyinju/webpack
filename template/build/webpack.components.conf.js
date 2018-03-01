'use strict'
const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const exportConfig = require('../src/router/router-export')
const EmitRouterPlugin = require('./EmitRouterPlugin')

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function resolveExports(routes){
  let entry = {}
  routes.forEach((component) => {
    if (!entry[component.component]) {
      entry[component.component] = resolve(component.dir)
    }
  })
  return entry
}

module.exports = {
  entry: resolveExports(exportConfig.routes),
  output: {
    path: resolve('dist/components'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
    new CleanWebpackPlugin(resolve('dist/components')),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    // new webpack.optimize.UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: true,
    //   parallel: true
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new EmitRouterPlugin(exportConfig)
  ]
}
