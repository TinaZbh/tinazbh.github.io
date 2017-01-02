/**
 * Created by zbh on 2016/12/28.
 * Description:启动项
 */
var http = require('http');
var url=require('url');
var querystring=require('querystring');
var router=require('./system/router');

var server=http.createServer(function(request,response){

    var postData='';
    request.on('data',function (chunk) {
        postData+=chunk;
    });
    request.on('end',function () {
        postData=querystring.parse(postData);
        global['_get']=url.parse(request.url,true).query;
        global['_post']=postData;
        global['_response']=response;
        var headObj={
            'Content-Types':'text/html;charset=utf-8',
            'Access-Control-Allow-Origin':'*', //用CORS法解决跨域问题，*表示接受所有跨域资源的请求
            // 'Access-Control-Allow-Credential':true
        };
        global['_response'].writeHead(200,headObj);
        router();
    });
});
server.listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
