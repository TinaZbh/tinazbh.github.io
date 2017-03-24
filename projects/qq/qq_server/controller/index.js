/**
 * Created by zbh on 2016/12/30.
 */
var myUtil=require('../system/myUtil');
var index=function (getData,postData,response) {
    myUtil.response('Can\'t find the controller',response);
    response.end();
};
module.exports=index;