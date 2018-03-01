const path = require('path')
const Mock = require('mockjs')
const fs = require('fs')


module.exports.mock = function(){
    return function(req,res,next){
        let url = req.url.indexOf('/') === 0 ? req.url:'/' + req.url
        console.log('requrest for '+ url)
        let jsonFile = 'mocks'+url+'.json'
        fs.readFile(jsonFile,(error,fileStr)=>{
            if(error){
                console.log('cannot find mock file: '+ jsonFile)
                let mockObj = {
                    retCode: "404",
                    retMsg: "undefined api"
                }
                res.json(Mock.mock(mockObj))
                res.end()
            }
            // let mockObj = JSON.parse(fileStr)
            res.send(fileStr)
            res.end()
        })
    }
}