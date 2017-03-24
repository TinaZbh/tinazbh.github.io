/**
 * Created by zbh on 2016/12/30.
 */

var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var register = function () {

    var nick_name = global['_post']['nickname'];
    var password = global['_post']['password'];
        var selectSql1 = "SELECT * FROM `qq_reg` WHERE `nick_name`='" + nick_name + "'";
        var insertSql1 = "INSERT INTO qq_reg(nick_name,password) VALUES(?,?)";
        var insertSql_data1 = [nick_name, password];
        sqlConnection(selectSql1, '', function (rows) {
            if (rows != null && rows.length > 0) {
                myUtil.response(resData.setFail().setFailCode().setMsg('该账号已注册，请登录').setEnd()).responseEnd();
                return;
            } else {
                sqlConnection(insertSql1, insertSql_data1, function (rows) {
                    myUtil.response(resData.setSuccessCode().setMsg("注册成功！").setEnd()).responseEnd();
                });
            }
        });
};
module.exports = register;