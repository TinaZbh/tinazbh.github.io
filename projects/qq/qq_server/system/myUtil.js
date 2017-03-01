/**
 * Created by zbh on 2016/12/31.
 */

var myUtil = {

    response: function (resData) {
        if (typeof resData != 'string') {
            resData = JSON.stringify(resData);//返回标准json形式的字符串,js响应是字符流的形式响应的
        }
        global['_response'].write(resData);
        return this;
    },
    responseEnd: function () {
        if (global['_connection'] != null) {//关闭数据库连接，一定要在所有回调函数结束之后关闭，因为是异步的，不会等上面的回调执行完再去执行end()
            global['_connection'].end();
            global['_connection'] = null;
        }
        global['_response'].end();
    }
};
module.exports = myUtil;