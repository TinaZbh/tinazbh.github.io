/**
 * Created by zbh on 2016/12/24.
 */
var next = {
    nextReg: function () {
        var user = document.getElementById('user');
        var psw = document.getElementById('psw');
        var conPsw = document.getElementById('conPsw');
        var hint = document.querySelector('.hint');
        var zhuce=document.querySelector('.zhuce');
        var sign1 = 1, sign2 = 1, sign3 = 1;
        if (user.value == '') {
            hint.style.display = 'block';
            hint.innerHTML = '昵称不能为空！';
            sign1 = 0;
        }
        if (psw.value == '') {
            hint.style.display = 'block';
            hint.innerHTML = '密码不能为空！';
            sign2 = 0;
        } else if (!/^[0-9a-zA-Z]{6,16}$/g.test(psw.value)) {
            hint.style.display = 'block';
            hint.innerHTML = '密码由6～16位的字母数字组成！';
            sign2 = 0;
        }
        if (conPsw.value == '') {
            hint.style.display = 'block';
            hint.innerHTML = '请确认密码！';
            sign3 = 0;
        } else if (conPsw.value !== psw.value) {
            hint.style.display = 'block';
            hint.innerHTML = '密码不一致！';
            sign3 = 0;
        }
        if (sign1 == 1 && sign2 == 1 && sign3 == 1) {
            // window.location.href='../login/login.html';
        }
        if (!(sign1 == 1 && sign2 == 1 && sign3 == 1)) {  //如果填写信息不符合要求则结束该函数，不再往下执行
            return false;
        }

        // function getCookie(name)
        // {
        //     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        //
        //     if(arr=document.cookie.match(reg))
        //
        //         return unescape(arr[2]);  //ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。
        //     else
        //         return null;
        // }
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();//删除两端空格
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length); //从email=之后的地方开始截取字符串儿
            }
            return "";
        }

        var getEmail = getCookie('email');//用cookie
        // var getEmail=localStorage.getItem("email");//用localStorage
        // console.log(getEmail);
        if (getEmail == null || getEmail == "") {
            hint.style.display = 'block';
            hint.innerHTML = '邮箱未填写!';
            return;
        }
        var regData = {
            email: getEmail,
            name: user.value,
            password: psw.value
        };
        // console.log(regData);
        // $.post("http://127.0.0.1:8888?m=register", regData, function (data) {  //$.post(发送请求的服务器url地址，发送给服务器的json数据，回调函数返回响应体，返回的数据格式)
        //
        //     hint.style.display = 'block';
        //     if(data.msg=='该账号已注册，请登录'){
        //         zhuce.style.display='block';
        //     }else {
        //         hint.innerHTML = data.msg;
        //     }
        //
        // }, 'json');

        // //jquery实现ajax
        // $.ajax({
        //     type:"POST",
        //     url:"http://127.0.0.1:8888?m=register",
        //     dataType:"json",
        //     data:regData,
        //     success:function (data) {
        //         hint.style.display = 'block';
        //         if (data.msg == '该账号已注册，请登录') {
        //             zhuce.style.display = 'block';
        //         } else {
        //             hint.innerHTML = data.msg;
        //         }
        //     },
        //     error:function (jqXHR) {
        //         alert("发生错误："+jqXHR.status);
        //     }
        //
        // });

        //用js实现ajax
        var request=new XMLHttpRequest();
        request.open("POST","http://127.0.0.1:8888?m=register");
        var sendData="email="+getEmail+"&name="+user.value+"&password="+psw.value;
        request.send(sendData);
        request.onreadystatechange=function () {
            if(request.readyState===4){
                if(request.status===200){
                    var data=JSON.parse(request.responseText);
                    // if(data.success){
                        hint.style.display = 'block';
                        if (data.msg == '该账号已注册，请登录') {
                            zhuce.style.display = 'block';
                        } else {
                            hint.innerHTML = data.msg;
                        }
                    // }
                }else{
                    alert("发生错误："+request.status);
                }
            }
        }
    },

    disappear2: function () {
        var hint = document.querySelector('.hint');
        hint.style.display = 'none';
    },


    last: function () {
        window.location.href = './index.html';
    }
};
//
//闭包的方式写js可以防止函数命名冲突
// var nextAction = function () {
//
//     function aaaa() {
//
//     }
//
//     return {
//         test : function () {
//             aaaa();
//         },
//     }
// };
//
//
// var lala = function () {
//
//     return {
//         test : function () {
//
//         }
//     }
// }
