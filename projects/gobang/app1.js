/**
 * Created by zbh on 2017/3/24.
 */
var http=require('http');
var querystring=require('querystring');
var url=require('url');
var router=require('./system/router');

var server=http.createServer(function (request,response) {
    var postData="";
    request.on('data',function (chunk) {
        postData+=chunk;
    });

    request.on('end',function () {
        postData=querystring.parse(postData);
        var getData=url.parse(request.url,true).query;
        var headObj={
            'Content-Type':'text/html;clarset:utf-8',
            'Access-Control-Allow-Origin':'*'//用CORS法解决跨域问题，*表示接受所有跨域资源的请求
        };
        response.writeHead(200,headObj);

        router(getData, postData, response);
    });

});
server.listen(8081);
