/**
 * Created by zbh on 2016/12/28.
 * Description:注册时访问该controller
 */
var mySqls=require('../system/mySqls');
var myUtil=require('../system/myUtil');
var resObj=require('../system/resObj');
var register=function () {
    var email=global['_post']['email'];
    var name=global['_post']['name'];
    var password=global['_post']['password'];

    // var insertSql = "INSERT INTO `user` SET `email` = '"+email+"', `user_name`='"+name+"', `password` = '"+password+"'";
//也可以写成这样,两种方式
    var selectSql="SELECT * FROM `user` WHERE `email`='" +email+"'";
    var insertSql="INSERT INTO user(email,user_name,password) VALUES(?,?,?)";
    var insertSql_data=[email,name,password];
    mySqls(selectSql,'',function (rows) {
        if(rows!=null&&rows.length>0){
            myUtil.response(resObj.setFail().setMsg('该账号已注册，请登录').setEnd()).responseEnd();
            return;
        }else{
            mySqls(insertSql,insertSql_data,function (rows) {
                myUtil.response(resObj.setMsg('注册成功').setEnd()).responseEnd();
            });
        }
    });

};
module.exports=register;