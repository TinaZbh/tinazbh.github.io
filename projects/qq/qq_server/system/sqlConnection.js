/**
 * Created by zbh on 2016/12/31.
 */
var mysql=require('mysql');

var sqlConnection=function (sql,sql_data,callback) {
    if(global['_connection']==null){
        global['_connection']=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'123456',
            database:'qq_user'
        });
        global['_connection'].connect(function (err) {
            if(err) throw err;
        });
    }
    global['_connection'].query(sql,sql_data,function (err,rows) {
        if(err){
            console.log('[query] - :'+err);
            return;
        }
        callback(rows);
    });
};
module.exports=sqlConnection;