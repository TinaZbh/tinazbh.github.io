/**
 * Created by zbh on 2016/12/31.
 */
var myUtil = require('../system/myUtil');
var resData = require('../system/resData');
var sqlConnection = require('../system/sqlConnection');

var nickname=function (getData,postData,response) {
    var nick_name = postData['nickname'];

    var selectSql = "SELECT * FROM `qq_reg` WHERE `nick_name`='" + nick_name + "'";
    sqlConnection(selectSql,'',function (rows) {
        if(rows!=null&&rows.length>0){
            myUtil.response(resData.setFail().setFailCode().setMsg('昵称被占用').setEnd(),response);
        }else {
            myUtil.response(resData.setSuccessCode().setMsg('good').setEnd(),response);
        }
        response.end();
    });

};
module.exports=nickname;