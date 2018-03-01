const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.conf')
const config = require('../config')
const compiler = webpack(webpackConfig)
const express = require('express')
const mockapi = require('./mock-server')
const app = express()
  
//允许跨域  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*")  
    res.header("Access-Control-Allow-Headers", "X-Requested-With")  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/jsoncharset=utf-8")  
    next()  
})

app.use(webpackMiddleware(compiler, {
    publicPath: config.dev.assetsPublicPath,
    quiet: true
}))

app.use(webpackHotMiddleware(compiler))

//静态资源
app.use('/components',express.static('dist/components'))

//mock api
app.use('/mocks',mockapi.mock())

app.listen(config.dev.port, () => console.log('你的项目已经运行在http://%s:%s请等待编译完成后打开浏览器访问',config.dev.host,config.dev.port))