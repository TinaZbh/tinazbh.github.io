/**
 * Created by zbh on 2016/12/29.
 * Description:给response赋值的函数
 */
var util=require('util');
var myUtil={
    response:function (resObj) {
        if(typeof resObj!='string'){ //js响应是字符流的形式响应的，因此响应的信息要是字符串的形式
            // resObj=util.inspect(resObj);//这种方式返回的不是json形式的字符串
            resObj=JSON.stringify(resObj);//返回标准json形式的字符串
        }
        global['_response'].write(resObj);
        return this; //返回的是调用对象也就是myUtil，为了后期可以链式调用
    },
    responseEnd:function () {
        if(global['_connection']!=null){//关闭与数据库的连接
            global['_connection'].end();//关闭数据库连接，一定要在所有回调函数结束之后关闭，因为是异步的，不会等上面的回调执行完再去执行end()
            global['_connection'] = null;
        }
        global['_response'].end();
    }
};
module.exports=myUtil;