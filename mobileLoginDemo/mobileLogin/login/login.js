/**
 * Created by zbh on 2016/12/24.
 */
function doLogin() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var hint = document.querySelector('.hint');

    if (email.value == '') {
        hint.style.display = 'block';
        hint.innerHTML = '请输入邮箱!';
        return false;
    } else if (!/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(email.value)) {
        hint.style.display = 'block';
        hint.innerHTML = '邮箱格式错误!';
        return false;
    }
    if (password.value == '') {
        hint.style.display = 'block';
        hint.innerHTML = '密码不能为空！';
        return false;
    } else if (!/^[0-9a-zA-Z]{6,16}$/g.test(password.value)) {
        hint.style.display = 'block';
        hint.innerHTML = '密码由6～16位的字母数字组成！';
        return false;
    }
    var loginData = {
        email: email.value,
        password: password.value
    };
    // console.log(loginData);
    //ajax

    // $.post("http://127.0.0.1:8888?m=login",loginData,function (data) {
    //
    //     // console.log(data);
    //     // var data=JSON.parse(data);//data已经是一个对象了
    //     hint.style.display = 'block';
    //     hint.innerHTML = data.msg;
    //
    // },'json');

    // //jquery实现ajax
    // $.ajax({
    //     type:"POST",
    //     url:"http://127.0.0.1:8888?m=login",
    //     dataType:"json",
    //     data:loginData,
    //     success:function (data) {
    //         hint.style.display = 'block';
    //         hint.innerHTML = data.msg;
    //     },
    //     error:function (jqXHR) {
    //         alert("发生错误："+jqXHR.status);
    //     }
    //
    // });
    //用js实现ajax
    var request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:8888?m=login");
    var sendData="email="+email.value+"&password="+password.value;
    request.send(sendData);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                // if(data.success){
                hint.style.display = 'block';
                hint.innerHTML = data.msg;
                // }
            } else {
                alert("发生错误：" + request.status);
            }
        }
    }
}
function disappear3() {
    var hint = document.querySelector('.hint');
    hint.style.display = 'none';
}
function doreg() {
    window.location.href = '../register/index.html';
}