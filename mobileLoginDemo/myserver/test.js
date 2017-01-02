/**
 * Created by zbh on 2016/12/28.
 * 测试与数据库的连接
 */
var mysql = require('mysql');
//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();//.connect();方法用来创建连接


//query();方法用来向mysql传递参数
//测试连接是否成功
// connection.query('SELECT 1+1 AS solution',function (err,rows,fields) {
//     if(err) {
//         throw err;
//         // console.log('[query] - :'+err);
//         // return;
//     }
//     console.log('The solution is:' ,rows[0].solution);
// });
//查询test数据库下的test表格中的数据内容
connection.query('SELECT * FROM `test` WHERE `email`="tina@163.com"', function (err, rows) {
    if (err) {
        // throw err;
        console.log('[query] - :' + err);
        return;
    }

    connection.query('SELECT * FROM `test` WHERE `name`="ethan"', function (err, rows) {
        if (err) {
            // throw err;
            console.log('[query] - :' + err);
            return;
        }
        // console.log('SELECT==>');
        // for (var i in rows) {
        //     console.log(i);
        //     console.log(rows[i]);
        // }
        if (rows != null && rows.length > 0) {
            console.log('hello');
        } else {
            console.log('world');
        }
    });
});

// 向test表格中插入一些内容
// var userADD='INSERT INTO test(email,name) VALUES(?,?)';
// var userADD_Params=['ethan@qq.com','Ethan'];
// connection.query(userADD,userADD_Params,function (err,result) {
//     if(err) {
//         console.log('[query] - :'+err);
//         return;
//     }
//     console.log('----------------------INSERT-------------------');
//     console.log(result[0]);
//     console.log(result[1]);
//
// });
// //
// var selectSql = "SELECT * FROM `test` WHERE `email`='ethan@qq.com' AND `name`='Ethan'";
// connection.query(selectSql,function (err,rows) {
//     if(err) {
//         // throw err;
//         console.log('[query] - :'+err);
//         return;
//     }
//     console.log('SELECT==>');
//     for (var i in rows){
//         console.log(i);
//         console.log(rows[i]);
//     }
// });
// connection.end(); //end();方法用来关闭连接