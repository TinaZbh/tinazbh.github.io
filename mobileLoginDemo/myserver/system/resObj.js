/**
 * Created by zbh on 2016/12/29.
 * Description:定义返回去的$post中function里面的data
 */

var resObj={
    resData:{
        code:200,
        msg:'success',
        data:{}
    },
    setFail:function () {
        this.resData.code=1000; //这里的this指resObj
        this.resData.msg='failed';
        return this;
    },
    setMsg:function (msg) {
        this.resData.msg=msg;
        return this;
    },
    setData:function (data) {
        this.resData.data=data;
        return this;
    },
    setEnd:function () {
        return this.resData;
    }

};
module.exports=resObj;