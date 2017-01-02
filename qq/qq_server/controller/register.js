/**
 * Created by zbh on 2016/12/30.
 */

var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var register = function () {

    var nick_name = global['_post']['nickname'];
    var email = global['_post']['email'];
    var phone_number = global['_post']['telephone'];
    var password = global['_post']['password'];
    var sex = global['_post']['sex'];
    var birthday = global['_post']['birthday'];
    var birth_place = global['_post']['birthplace'];

    if (email == null || email == '') {
        email = '';
        var selectSql1 = "SELECT * FROM `qq_reg` WHERE `phone_number`='" + phone_number + "'";
        var insertSql1 = "INSERT INTO qq_reg(nick_name,email,phone_number,password,sex,birthday,birth_place) VALUES(?,?,?,?,?,?,?)";
        var insertSql_data1 = [nick_name, email, phone_number, password, sex, birthday, birth_place];
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
    } else if (phone_number == null || phone_number == '') {
        phone_number = '';
        var selectSql2 = "SELECT * FROM `qq_reg` WHERE `email`='" + email + "'";
        var insertSql2 = "INSERT INTO qq_reg(nick_name,email,phone_number,password,sex,birthday,birth_place) VALUES(?,?,?,?,?,?,?)";
        var insertSql_data2 = [nick_name, email, phone_number, password, sex, birthday, birth_place];
        sqlConnection(selectSql2, '', function (rows) {
            if (rows != null && rows.length > 0) {
                myUtil.response(resData.setFail().setFailCode().setMsg('该账号已注册，请登录').setEnd()).responseEnd();
                return;
            } else {
                sqlConnection(insertSql2, insertSql_data2, function (rows) {
                    myUtil.response(resData.setSuccessCode().setMsg("注册成功！").setEnd()).responseEnd();
                });
            }
        });
    }

};
module.exports = register;