/**
 * Created by zbh on 2016/12/31.
 */
var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var nickname=function () {
    var nick_name = global['_post']['nickname'];

    var selectSql = "SELECT * FROM `qq_reg` WHERE `nick_name`='" + nick_name + "'";
    sqlConnection(selectSql,'',function (rows) {
        if(rows!=null&&rows.length>0){
            myUtil.response(resData.setFail().setFailCode().setMsg('昵称被占用').setEnd()).responseEnd();
        }else {
            myUtil.response(resData.setSuccessCode().setMsg('good').setEnd()).responseEnd();
        }
    });

};
module.exports=nickname;