/**
 * Created by zbh on 16/10/15.
 */
var isclick3 = 0;
var isclick4 = 0;
var isclick5 = 0;

function autoFocus() {
    document.querySelector("#nickname").focus();
    // isclick3=1;
    if (document.cookie == "1") {
        reg_qq();
    } else if (document.cookie == "2") {
        reg_email();
    }
}

function reg_qq() {
    document.querySelector("#nickname").focus();
    document.querySelector(".fis_btn:first-child").style.background = "url('http://6.url.cn/zc/chs/img/left_2.png?v=10090') left bottom no-repeat";
    document.querySelector(".fis_btn:nth-child(2)").style.background = "url('http://6.url.cn/zc/chs/img/left_2.png?v=10090') left top no-repeat";
    document.querySelectorAll(".fis_btn:first-child span")[1].style.color = "white";
    document.querySelectorAll(".fis_btn:first-child span")[2].style.color = "white";
    document.querySelectorAll(".fis_btn:nth-child(2) span")[1].style.color = "#616c72";
    document.querySelectorAll(".fis_btn:nth-child(2) span")[2].style.color = "#616c72";
    document.querySelector(".fis_btn:first-child .icon").style.color = "white";
    document.querySelector(".fis_btn:nth-child(2) .icon").style.color = "#69b946";
    document.querySelector(".home_title").innerHTML = "注册账号";
    document.querySelectorAll(".email")[0].style.display = "none";
    document.querySelectorAll(".email")[1].style.display = "none";
    document.querySelector(".regEmail").style.display = "none";
    document.querySelector(".menu_8").style.display = "none";
    document.querySelector(".menu_7").style.display = "block";
    document.querySelector(".hint_psw").style.top = "32px";
    isclick3 = 1;
    document.cookie = "1";

}
function reg_email() {
    document.querySelector(".fis_btn:first-child").style.background = "url('http://6.url.cn/zc/chs/img/left_2.png?v=10090') left top no-repeat";
    document.querySelector(".fis_btn:nth-child(2)").style.background = "url('http://6.url.cn/zc/chs/img/left_2.png?v=10090') left bottom no-repeat";
    document.querySelectorAll(".fis_btn:first-child span")[1].style.color = "#616c72";
    document.querySelectorAll(".fis_btn:first-child span")[2].style.color = "#616c72";
    document.querySelectorAll(".fis_btn:nth-child(2) span")[1].style.color = "white";
    document.querySelectorAll(".fis_btn:nth-child(2) span")[2].style.color = "white";
    document.querySelector(".fis_btn:first-child .icon").style.color = "#69b946";
    document.querySelector(".fis_btn:nth-child(2) .icon").style.color = "white";
    document.querySelector(".home_title").innerHTML = "注册邮箱账号";
    document.querySelectorAll(".email")[0].style.display = "block";
    document.querySelectorAll(".email")[1].style.display = "block";
    document.querySelector(".regEmail").style.display = "none";
    document.querySelector(".menu_8").style.display = "none";
    document.querySelector(".menu_7").style.display = "none";
    document.querySelector(".hint_psw").style.top = "82px";
    document.querySelector("#email_name").focus();
    isclick3 = 0;
    // alert(isclick3);
    document.cookie = "2";
}
function create_email() {
    document.querySelectorAll(".email")[0].style.display = "none";
    document.querySelector(".regEmail").style.display = "block";
    document.querySelector(".registerEmail").style.display = 'block';
    document.querySelector("#register_email").focus();
}
function birthday_appear(obj_str) {
    var obj = document.querySelector(obj_str);
    if (window.getComputedStyle(obj).display == "none") {
        obj.style.display = "block";
    } else {
        obj.style.display = "none";
    }
}
function change_birth_type1(obj, str) {
    document.getElementById(obj).innerHTML = str;
}
function change_birth_type(obj, str) {
    document.getElementById(obj).value = str;
}
function verify_appear() {
    document.querySelector(".menu_8").style.display = "block";
}

function isClick3() {
    isclick3 = 1;
}
function isClick4() {
    isclick4 = 1;
}
function isClick5() {
    isclick5 = 1;
}
function chooseMale() {
    var newOne = document.querySelectorAll(".sex_box a");
    newOne[0].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -267px -417px no-repeat';
    newOne[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -300px -322px no-repeat';
}
function chooseFemale() {
    var newOne = document.querySelectorAll(".sex_box a");
    newOne[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -267px -417px no-repeat';
    newOne[0].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -300px -322px no-repeat';
}

function warnAppear(obj, a) {
    var newWarn = document.querySelector(obj);
    var hel = document.querySelectorAll(".item_box");
    hel[a - 1].style.background = "url('http://6.url.cn/zc/chs/img/ipt.png?v=10090') 0 -35px no-repeat";
    if (a == 1) {
        newWarn.style.display = 'block';
        document.querySelector(".warn.emailCode1").style.display = 'none';
    }
    if (a == 2) {
        newWarn.innerHTML = '请创建邮箱名，由3-18个英文、数字、点、减号、下划线组成';
        newWarn.style.color = "grey";
        newWarn.style.background = "none";
        newWarn.style.paddingLeft = "0";
        hel[a - 1].style.background = "url('http://6.url.cn/zc/chs/img/ipt.png?v=10090') 0 -210px no-repeat";
    }
    if (a == 3) {
        newWarn.style.display = 'block';
        newWarn.innerHTML = '请输入昵称';
        newWarn.style.color = "grey";
        newWarn.style.background = "none";
        newWarn.style.paddingLeft = "0";
    }
    if (a == 4) {
        // var newInp = document.getElementById("password");
        // var hint=document.querySelectorAll(".hint_psw .hPsw");
        newWarn.style.color = "grey";
        newWarn.style.background = "none";
        newWarn.style.paddingLeft = "0";
        document.querySelector(".hint_psw").style.display = 'block';
        // if((newInp.value.length<6||newInp.value.length>16)&&newInp.value.length>0){
        //     document.querySelector(".hint_psw").style.display='block';
        //     hint[0].style.background="url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
        // }
    }
    if (a == 5) {
        newWarn.style.display = 'block';
        newWarn.innerHTML = '请再次输入密码';
        newWarn.style.color = "grey";
        newWarn.style.background = "none";
        newWarn.style.paddingLeft = "0";
    }
}
function warnChangeDelay() {
    setTimeout("warnChange('.emailCode',1)", 150);
}
function warnChange(obj, a) {
    var newWarn = document.querySelector(obj);
    var itemBox = document.querySelectorAll(".item_box");
    itemBox[a - 1].style.background = "url('http://6.url.cn/zc/chs/img/ipt.png?v=10090') 0 0 no-repeat";

    if (a == 1) {
        var newInp = document.getElementById("email_name");
        var newInp1 = document.querySelector(".warn.emailCode1");
        // if (document.querySelectorAll('.warn.emailCode a')[0].onclick) {
        //     return;
        // }
        // if (document.querySelectorAll('.warn.emailCode a')[1].onclick) {
        //     return;
        // }
        if (newInp.value == "") {
            newWarn.style.display = 'none';
            newInp1.style.display = 'block';
            itemBox[0].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0 no-repeat";
        } else if ((newInp.value.search('@') == -1) || (newInp.value.search('.com') == -1) || (newInp.value.search(' ') != -1)) {
            newWarn.style.display = 'none';
            newInp1.innerHTML = "输入格式错误";
            newInp1.style.display = 'block';
            itemBox[0].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
        }
        if (!document.querySelectorAll('.warn.emailCode a')[0].onclick) {
            create_email();
        }
        if (!document.querySelectorAll('.warn.emailCode a')[1].onclick) {
            reg_qq();
        }
    }
    if (a == 2) {
        var newInp = document.getElementById("register_email");
        itemBox[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") 0 -176px no-repeat';
        // document.querySelector(".regEmail .item_box").style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") 0 -176px no-repeat';
        if (newInp.value == "") {
            newWarn.innerHTML = '请输入邮箱';
            newWarn.style.color = "red";
            newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
            newWarn.style.paddingLeft = "18px";
            newWarn.style.height = "22px";
            newWarn.style.lineHeight = "22px";
            itemBox[1].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 -114px  no-repeat";
        }
    }

    if (a == 3 && isclick3 == 1) {

        var newInp = document.getElementById("nickname");
        if (newInp.value == "") {
            newWarn.innerHTML = '昵称不可为空';
            newWarn.style.color = "red";
            newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
            newWarn.style.paddingLeft = "18px";
            newWarn.style.height = "22px";
            newWarn.style.lineHeight = "22px";
            itemBox[2].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
        }
    }
    if (a == 4 && isclick4 == 1) {
        var newInp = document.getElementById("password");
        if (newInp.value == "") {
            document.querySelector(".hint_psw").style.display = 'block';
            itemBox[3].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
        }
        var hint = document.querySelectorAll(".hint_psw .hPsw");
        if ((newInp.value.length < 6 || newInp.value.length > 16) && newInp.value.length > 0) {
            document.querySelector(".hint_psw").style.display = 'block';
            hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
            hint[0].style.color = "red";
        } else {
            hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
            hint[0].style.color = "black";
        }
        if (newInp.value.search(" ") != -1) {
            document.querySelector(".hint_psw").style.display = 'block';
            hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
            hint[1].style.color = "red";
        } else {
            hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
            hint[1].style.color = "black";
        }
        if ((parseInt(newInp.value.substr(0, 9)) + "").length == 9 && !isNaN(parseInt(newInp.value.substr(0, 9))) && ((newInp.value.substr(0, 9)) + "").search("-") == -1) {
            document.querySelector(".hint_psw").style.display = 'block';
            hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
            hint[2].style.color = "red";
        } else {
            hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
            hint[2].style.color = "black";
        }
    }
    if (a == 5 && isclick5 == 1) {
        var newInp = document.getElementById("confirm_psw");
        if (newInp.value == "") {
            newWarn.innerHTML = '请再次输入密码';
            newWarn.style.color = "red";
            newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
            newWarn.style.paddingLeft = "18px";
            newWarn.style.marginTop = "5px";
            newWarn.style.height = "22px";
            newWarn.style.lineHeight = "22px";
            itemBox[4].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
        }
    }
}

function leaveBirth(str) {
    var obj = document.getElementById(str);
    obj.style.display = "none";
}