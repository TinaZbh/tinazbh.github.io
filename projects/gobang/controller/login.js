/**
 * Created by zbh on 2016/12/30.
 */
var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var login = function (getData, postData, response) {
    var nick_name = postData['nickname'];
    var password = postData['password'];

    var selectSql3 = "SELECT * FROM `qq_reg` WHERE `nick_name`='" + nick_name + "' AND `password`='" + password + "'";
    sqlConnection(selectSql3, '', function (rows) {
        if (rows != null && rows.length > 0) {
            var data = {
                user_id: rows[0]['user_id']
            };
            myUtil.response(resData.setSuccessCode().setData(data).setMsg('登录成功').setEnd(),response);
        } else {
            myUtil.response(resData.setFail().setFailCode().setMsg('用户不存在').setEnd(),response);
        }
        response.end();
    });

};
module.exports = login;