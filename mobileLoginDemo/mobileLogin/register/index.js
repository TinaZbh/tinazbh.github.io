/**
 * Created by zbh on 2016/12/24.
 */
var theFirst = function () {
    return {
        next1:function () {
            var email = document.getElementById('email');
            var hint = document.querySelector('.hint')
            if (email.value == '') {
                hint.style.display = 'block';
                hint.innerHTML = '请输入邮箱!';
                return false;
            } else if (!/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(email.value)) {
                hint.style.display = 'block';
                hint.innerHTML = '输入格式错误!';
                return false;
            } else {
                // function setCookie(cname,cvalue,exdays)
                // {
                //     var d = new Date();
                //     d.setTime(d.getTime()+(exdays*24*60*60*1000));
                //     var expires = "expires="+d.toGMTString();
                //     document.cookie = cname + "=" + cvalue + "; " + expires;
                // }
                // setCookie('email',email.value,30);

                document.cookie = 'email=' + email.value;
                // localStorage.setItem("email",email.value);
                window.location.href = './next.html';//用cookie存储是，这里跳转的地址一定要是同一个文件夹下面的页面，不能是上一级文件夹下面的

            }
        },

        disappear1:function () {
            var email = document.getElementById('email');
            var hint = document.querySelector('.hint');
            hint.style.display = 'none';
        },
        iLogin:function () {
            window.location.href = '../login/login.html';
        }
    }

};


// function next1() {
//     var email=document.getElementById('email');
//     var hint=document.querySelector('.hint')
//     if(email.value==''){
//         hint.style.display='block';
//         hint.innerHTML='请输入邮箱!';
//     }else if(!/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(email.value)){
//         hint.style.display='block';
//         hint.innerHTML='输入格式错误!';
//     }else{
//         window.location.href='next.html';
//         document.cookie='email='+email.value;
//     }
// }
// function disappear1() {
//     var email=document.getElementById('email');
//     var hint=document.querySelector('.hint');
//         hint.style.display = 'none';
// }
// function iLogin() {
//     window.location.href='login.html';
// }
