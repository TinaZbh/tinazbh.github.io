/**
 * Created by zbh on 2016/12/30.
 */
var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var login = function () {
    var nick_name = global['_post']['nickname'];
    var password = global['_post']['password'];

    var selectSql3 = "SELECT * FROM `qq_reg` WHERE `nick_name`='" + nick_name + "' AND `password`='" + password + "'";
    sqlConnection(selectSql3, '', function (rows) {
        if (rows != null && rows.length > 0) {
            var data = {
                user_id: rows[0]['user_id']
            };
            myUtil.response(resData.setSuccessCode().setData(data).setMsg('登录成功').setEnd()).responseEnd();
            return;
        } else {
            myUtil.response(resData.setFail().setFailCode().setMsg('用户不存在').setEnd()).responseEnd();

        }
    });

};
module.exports = login;