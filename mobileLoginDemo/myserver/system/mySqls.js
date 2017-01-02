/**
 * Created by zbh on 2016/12/29.
 */

var mysql=require('mysql');
var mySqls=function (sql,sql_data,callback) {
    if(global['_connection']==null){ //创建一个connection

        global['_connection']=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'123456',
            database:'user_system'
        });
        global['_connection'].connect(function (err){ //.connect();方法用来创建连接,显式创建连接，不能多次创建连接，否则会报错
            if(err) throw err;
        });
    }

    global['_connection'].query(sql,sql_data,function (err,rows) {//若没有显式创建连接，query函数也会隐式创建连接
        if(err) {
            // throw err;
            console.log('[query] - :'+err);
            return;
        }
        callback(rows);
    })
};
module.exports=mySqls;