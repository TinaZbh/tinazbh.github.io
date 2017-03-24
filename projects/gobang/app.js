/**
 * Created by zbh on 2017/3/18.
 */
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
// var querystring=require('querystring');
// var url=require('url');
// var router=require('./system/router');
var users = {};
//静态文件托管
app.use('/',express.static(__dirname+'/www'));
server.listen(process.env.PORT||3000);
// app.POST("/",function(){
//     var postData="";
//     request.on('data',function (chunk) {
//         postData+=chunk;
//     });
//
//     request.on('end',function () {
//         postData=querystring.parse(postData);
//         global['_get']=url.parse(request.url,true).query;
//         global['_post']=postData;
//         global['_response']=response;
//         var headObj={
//             'Content-Type':'text/html;clarset:utf-8',
//             'Access-Control-Allow-Origin':'*'//用CORS法解决跨域问题，*表示接受所有跨域资源的请求
//         };
//         global['_response'].writeHead(200,headObj);
//         router();
//     });
// });

io.sockets.on('connection',function (socket) {
    socket.on('login',function (nickname) {
        socket.nickname=nickname;
        // users.push(nickname);
        users[nickname]="on_line";
        socket.join(nickname);
        socket.emit('loginSuccess');
        // var newUsers=users.join(",");
        var newUsers=JSON.stringify(users);
        //当有人成功登录时用户列表更新
        io.sockets.emit('system',newUsers);
    });
    //邀请者对指定的人发出邀请
    socket.on("invitation",function (data) {
        var newData=JSON.parse(data);
        io.sockets.in(newData.sto).emit("beInvited",newData.sfrom);
    });
    //回复邀请者，被邀请者是否同意该邀请
    socket.on("popRes",function (popStr,data) {
        var newData=JSON.parse(data);
        io.sockets.in(newData.sto).emit("popReply",popStr,newData.sfrom)
    });
    //传输对手所下子的位置
    socket.on("tranLocation",function (data) {
        var newData=JSON.parse(data);
        io.sockets.in(newData.sto).emit("setLocation",data);
    });
    //改变游戏状态中的用户的uers的属性值从on_line变为in_game
    socket.on("onChangeColor",function (nameObj,state) {
        // io.sockets.emit("changeColor",nameObj);
        users[nameObj]=state;
    });
    //当有人进入游戏状态时就会重新刷新一次用户列表，使游戏中的用户的字体变绿
    socket.on("systemUpdate",function () {
        var newUsers=JSON.stringify(users);
        io.sockets.emit('system',newUsers);
    });
    //为筛选传送users
    socket.on("chooseUsers",function (sto) {
        var newUsers=JSON.stringify(users);
        io.sockets.in(sto).emit("usersFilter",newUsers);
    });
    //用户断开连接
    socket.on('disconnect',function () {
        if(socket.nickname!=null){
            // users.splice(users.indexOf(socket.nickname),1);
            // var newUsers=users.join(",");
            delete users[socket.nickname];
            var newUsers=JSON.stringify(users);
            socket.broadcast.emit("system",newUsers);
        }
    });
});

