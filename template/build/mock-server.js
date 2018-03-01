var fs = require('fs');

function processData (mockObj) {
    var res = {
        ESPRESSO_RETURN_VERSION: '1.0',
        status: '000',
        data: mockObj
    }
    return res
}


module.exports = {
    mock: function(){
        return function(req,res,next){
            let url = req.url.indexOf('/') === 0 ? req.url:'/' + req.url;
            console.log('requrest for '+ url)
            let jsonFile = './mocks'+url+'.json'
            fs.readFile(jsonFile,(error,fileStr)=>{
                let mockObj = {
                    retCode: '404',
                    retMsg: 'api not exist'
                }
                if(error){
                    console.log('cannot find mock file: '+ jsonFile)
                }else{
                    mockObj = JSON.parse(fileStr)
                }
                res.set('content-type', 'application/json')
                res.send(processData(mockObj))
            })
        }
    }
}