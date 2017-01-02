/**
 * Created by zbh on 2016/12/28.
 * Description:登录时访问该controller
 */

var mySqls=require('../system/mySqls');
var myUtil=require('../system/myUtil');
var resObj=require('../system/resObj');
var login=function () {
    var email=global['_post']['email'];
    var password=global['_post']['password'];


    // var selectSql="SELECT * FROM `user` WHERE `email`='"+email+"' AND `password`='"+password+"'";
    // mySqls(selectSql,'',function (rows) {
    //     if(rows!=null&&rows.length>0){  //rows可能是空数组所以要判断长度大于0，但是若rows为null直接判断length会报错
    //         var data={
    //             user_id:rows[0]['user_id']
    //         };
    //         myUtil.response(resObj.setData(data).setMsg('登录成功').setEnd()).responseEnd();
    //     }
    //     else {
    //         myUtil.response(resObj.setFail().setMsg('用户不存在').setEnd()).responseEnd();
    //     }
    // });
    var selectSql="SELECT * FROM `user` WHERE `email`='"+email+"'";
    mySqls(selectSql,'',function (rows) {
        if(rows!=null && rows.length>0){//rows可能是空数组所以要判断长度大于0，但是若rows为null直接判断length会报错
            var selectSql="SELECT * FROM `user` WHERE `email`='"+email+"' AND `password`='"+password+"'";//数据库查询语句是独立的，即使上面已经判断过email，这边也还要再判断一次
            mySqls(selectSql,'',function (rows) {
                if(rows!=null && rows.length>0){
                    var data={
                        user_id:rows[0]['user_id']
                    };
                    myUtil.response(resObj.setData(data).setMsg('登录成功').setEnd()).responseEnd();
                    return;
                }else{
                    myUtil.response(resObj.setFail().setMsg('密码错误').setEnd()).responseEnd();
                    return;
                }

            });
        } else {
            myUtil.response(resObj.setFail().setMsg('用户不存在').setEnd()).responseEnd();
        }
    });


};
module.exports=login;