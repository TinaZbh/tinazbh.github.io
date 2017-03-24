/**
 * Created by zbh on 2016/12/31.
 */

var myUtil = {

    response: function (resData,response) {
        if (typeof resData != 'string') {
            resData = JSON.stringify(resData);//返回标准json形式的字符串,js响应是字符流的形式响应的
        }
        response.write(resData);
        return response;
    }
};
module.exports = myUtil;