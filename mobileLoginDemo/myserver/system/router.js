/**
 * Created by zbh on 2016/12/28.
 * Description:根据请求的url中的参数m，分配给不同的controller处理
 */
var fs=require('fs');
var router=function() {
    var s=global['_get']['m'];
    if(s==null||s==''){ //判断请求的url中的m参数的值是否有 null==（不严格相等）undefined
        s='index';
    }
    fs.stat('./controller/'+s+'.js',function (err,stats) {  //获取文件信息，主要判断有无这个文件，注意这里的路径是从启动文件路径算起的即根目录
        if(err){
            s='index';
        }
        var controller=require('../controller/'+s);  //加载m参数对应的模块
        controller();  //调用模块
    });
};
module.exports=router;