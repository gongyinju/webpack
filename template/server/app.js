var express = require('express');  
var path = require('path');
let Mock = require('mockjs');        //引入mock模块
var fs = require('fs');
var app = express();  
  
//允许跨域  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  

//静态资源
app.use('/static',express.static(path.join(__dirname, '../static')));

app.use('/api',function(req,res,next){
    let url = req.url.indexOf('/') === 0 ? req.url:'/' + req.url;
    let jsonFile = './server/mocks'+url+'.json';
    fs.readFile(jsonFile,(error,fileStr)=>{
        if(error){
            console.log('cannot find mock file: '+ jsonFile)
            return;
        }
        let mockObj = JSON.parse(fileStr);
        res.json(Mock.mock(mockObj))
    })
});


//启动服务，监听一个端口，不要和页面的端口  
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});  