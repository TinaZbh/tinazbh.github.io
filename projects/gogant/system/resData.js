/**
 * Created by zbh on 2016/12/31.
 */

var resData={
    resMsg:{
        code:200,
        msg:'success',
        data:{}
    },

    setFail:function () {
        this.resMsg.msg='failed';
        return this;
    },
    setFailCode:function () {
        this.resMsg.code=1000;
        return this;
    },
    setSuccessCode:function () {
        this.resMsg.code=200;
        return this;
    },
    setMsg:function (obj) {
        this.resMsg.msg=obj;
        return this;
    },
    setData:function (obj) {
        this.resMsg.data=obj;
        return this;
    },
    setEnd:function () {
        return this.resMsg;
    }
};
module.exports=resData;