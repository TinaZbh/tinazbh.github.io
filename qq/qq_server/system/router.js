/**
 * Created by zbh on 2016/12/31.
 */

var fs=require('fs');
var router=function () {
    var s=global['_get']['m'];
    if(s==null||s==''){
        s='index';
    }
    fs.stat('./controller/'+s+'.js',function (err,stats) {////获取文件信息，主要判断有无这个文件，注意这里的路径是从启动文件路径算起的即根目录
        if(err){
            s='index';
        }
        var controller=require('../controller/'+s);
        controller();
    });
};
module.exports=router;