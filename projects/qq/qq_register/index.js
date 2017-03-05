/**
 * Created by zbh on 2017/3/5.
 */
var isclick3 = 0;
var chooseSex = 1;  //设置一个标记代表性别，默认为1代表男性
var markA3 = 0;//为nickname那个作记号，防止填写错误阻止注册进行，由于nickname里面有ajax请求，为了不在提交注册再次调用所以给它一个全局变量来记录


var indexAction = function () {

    //内部配置项
    var params = {
        // isclick3: 0
    };

    //私有方法


    var privateWarnChange = function (obj, a) {
        var newWarn = document.querySelector(obj);
        var itemBox = document.querySelectorAll(".item_box");
        itemBox[a - 1].style.background = "url('http://6.url.cn/zc/chs/img/ipt.png?v=10090') 0 0 no-repeat";

        if (a == 1) {
            var newInp = document.getElementById("email_name");
            var newInp1 = document.querySelector(".warn.emailCode1");
            var mark = 0;
            if (newInp.value == "") {
                newWarn.style.display = 'none';
                newInp1.style.display = 'block';
                newInp1.innerHTML = "邮箱不能为空";
                itemBox[0].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0 no-repeat";
                mark = 1;
            } else if (!/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(newInp.value)) {
                newWarn.style.display = 'none';
                newInp1.innerHTML = "输入格式错误";
                newInp1.style.display = 'block';
                itemBox[0].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1;
            } else if (/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(newInp.value)) {
                newWarn.style.display = 'none';
                newInp1.style.display = 'block';
                newInp1.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                newInp1.innerHTML = '';
                mark = 0;
            }
            if (!document.querySelectorAll('.warn.emailCode a')[0].onclick) {
                indexAction().create_email();
            }
            if (!document.querySelectorAll('.warn.emailCode a')[1].onclick) {
                indexAction().reg_qq();
            }
            if (mark === 1) return false;
        }
        if (a == 2) {
            var newInp = document.getElementById("register_email");
            itemBox[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") 0 -176px no-repeat';
            // document.querySelector(".regEmail .item_box").style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") 0 -176px no-repeat';
            var mark = 0;
            if (newInp.value == "") {
                newWarn.innerHTML = '请输入邮箱';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[1].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 -114px  no-repeat";
                mark = 1;
            } else if (!/^[a-zA-Z0-9-_]{3,18}$/g.test(newInp.value)) {
                newWarn.innerHTML = '输入格式错误';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[1].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 -114px  no-repeat";
                mark = 1;
            } else {
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                newWarn.innerHTML = '';
                mark = 0;
            }
            if (mark === 1) {
                return false;
            }
        }

        if (a == 3) {

            var newInp = document.getElementById("nickname");
            if (newInp.value == "") {
                newWarn.innerHTML = '昵称不可为空';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[2].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                markA3 = 0;
                return;
            } else {

                $.post('http://104.131.102.43?m=nickname', {nickname: newInp.value}, function (data) {
                    console.log(data);
                    if (data.msg == 'good') {
                        newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                        newWarn.innerHTML = '';
                        markA3 = 1;
                    } else {
                        newWarn.innerHTML = data.msg;
                        newWarn.style.color = "red";
                        newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                        newWarn.style.paddingLeft = "18px";
                        newWarn.style.height = "22px";
                        newWarn.style.lineHeight = "22px";
                        itemBox[2].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                        markA3 = 0;
                        return;
                    }

                }, 'json');

            }

            // else if(/^[a-zA-Z0-9-_]{24,}$/.test(newInp.value)||/^[\u4e00-\u9fa5]{12,}$/.test(newInp.value)) {
            //     newWarn.innerHTML = '不能超过24个字母或12个汉字';
            //     newWarn.style.color = "red";
            //     newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
            //     newWarn.style.paddingLeft = "18px";
            //     newWarn.style.height = "22px";
            //     newWarn.style.lineHeight = "22px";
            //     itemBox[2].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
            // }
        }
        if (a == 4) {
            var newInp = document.getElementById("password");
            var sign = 1;
            var hint = document.querySelectorAll(".hint_psw .hPsw");
            var mark = 0;
            if (newInp.value == "") {
                document.querySelector(".hint_psw").style.display = 'block';
                itemBox[3].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
                hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
                hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
                hint[0].style.color = "black";
                hint[1].style.color = "black";
                hint[2].style.color = "black";
                sign = 0;
                mark = 1;
            }

            if ((newInp.value.length < 6 && newInp.value.length > 0) || newInp.value.length > 16) {
                document.querySelector(".hint_psw").style.display = 'block';
                hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                hint[0].style.color = "red";
                sign = 0;
                mark = 1;
            } else if (newInp.value !== "") {
                hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                hint[0].style.color = "black";
                mark = 1
            }
            if (/\s/g.test(newInp.value)) {
                document.querySelector(".hint_psw").style.display = 'block';
                hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                hint[1].style.color = "red";
                sign = 0;
                mark = 1
            } else if (newInp.value !== "") {
                hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                hint[1].style.color = "black";
                mark = 0
            }
            // if ((parseInt(newInp.value.substr(0, 9)) + "").length == 9 && !isNaN(parseInt(newInp.value.substr(0, 9))) && ((newInp.value.substr(0, 9)) + "").search("-") == -1) {
            if (/^[0-9]{1,9}$/.test(newInp.value)) {
                document.querySelector(".hint_psw").style.display = 'block';
                hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                hint[2].style.color = "red";
                sign = 0;
                mark = 1;
            } else if (newInp.value !== "") {
                hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                hint[2].style.color = "black";
                mark = 0
            }
            if (sign == 1) {
                document.querySelector(".hint_psw").style.display = 'none';
                newWarn.style.display = 'block';
                if (/^[a-zA-Z0-9]{6,7}$/g.test(newInp.value) || /^[A-Z]{6,16}$/g.test(newInp.value) || /^[0-9]{6,7}$/g.test(newInp.value) || /^[a-z]{6,16}$/g.test(newInp.value)) {
                    newWarn.innerHTML = "试试字母、数字、标点的组合吧";
                    newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -102px no-repeat";
                    newWarn.style.paddingTop = "18px";
                } else if (/^[a-z0-9A-Z]{8,16}$/g.test(newInp.value)) {
                    newWarn.innerHTML = "复杂度还行，再加强一下等级？";
                    newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -145px no-repeat";
                    newWarn.style.paddingTop = "18px";
                } else {
                    newWarn.innerHTML = "密码强度好，哥们请记牢！";
                    newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -192px no-repeat";
                    newWarn.style.paddingTop = "18px";
                }
            }
            if (mark === 1) {
                return false;
            }

        }
        if (a == 5) {
            var newInp = document.getElementById("confirm_psw");
            var mark = 0;
            if (newInp.value == "") {
                newWarn.innerHTML = '请再次输入密码';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[4].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1;
            } else if (newInp.value !== document.getElementById("password").value) {
                newWarn.innerHTML = '密码不一致';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[4].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1
            } else {
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                newWarn.innerHTML = '';
                mark = 0;
            }
            if (mark === 1) {
                return false;
            }
        }

        if (a == 6) {
            var newInp = document.getElementById("birthplace");
            var mark = 0;
            if (newInp.value == "") {
                newWarn.style.display = "none";
                itemBox[5].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1;
            } else {
                newWarn.style.display = "block";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -245px no-repeat";
                mark = 0;
            }
            if (mark === 1) {
                return false;
            }

        }
        if (a == 7) {
            var newInp = document.getElementById("telephone");
            var mark = 0;
            if (newInp.value == "") {
                newWarn.style.display = "none";
                itemBox[6].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1;
            }
            else if (newInp.value.length !== 11) {
                newWarn.style.display = "block";
                newWarn.innerHTML = '请输入有效的手机号';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[6].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
                mark = 1;
            }
            /*
             * 原文链接：http://www.jianshu.com/p/e8477fdccbe9
             * 手机号码:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/
             * 13[0-9], 14[5,7], 15[0, 1, 2, 3, 5, 6, 7, 8, 9], 17[0, 1, 6, 7, 8], 18[0-9]
             * 移动号段: 134,135,136,137,138,139,147,150,151,152,157,158,159,170,178,182,183,184,187,188
             * 联通号段: 130,131,132,145,155,156,170,171,175,176,185,186
             * 电信号段: 133,149,153,170,173,177,180,181,189
             */
            else if (/^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\d{8}$/g.test(newInp.value)) {
                newWarn.style.display = "block";
                newWarn.innerHTML = '中国移动';
                newWarn.style.color = "grey";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -247px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                mark = 0;
            }
            else if (/^1(3[0-2]|4[5]|5[56]|7[0156]|8[56])\d{8}$/g.test(newInp.value)) {
                newWarn.style.display = "block";
                newWarn.innerHTML = '中国联通';
                newWarn.style.color = "grey";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -247px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                mark = 0;
            }
            else if (/^1(3[3]|4[9]|53|7[037]|8[019])\d{8}$/g.test(newInp.value)) {
                newWarn.style.display = "block";
                newWarn.innerHTML = "中国电信";
                newWarn.style.color = "grey";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -247px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                mark = 0;
            }
            else {
                mark = 1;
                newWarn.style.display = "block";
                newWarn.innerHTML = '请输入有效的手机号';
                newWarn.style.color = "red";
                newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                newWarn.style.paddingLeft = "18px";
                newWarn.style.marginTop = "5px";
                newWarn.style.height = "22px";
                newWarn.style.lineHeight = "22px";
                itemBox[6].style.background = "url('http://6.url.cn/zc/chs/img/input_error.png?v=10090') 0 0  no-repeat";
            }
            if (mark === 1) {
                return false;
            }
        }
    };

    var leaveB=function (str) {
        var obj = document.getElementById(str);
        var fObj = document.getElementById(str + "_value");
        var fYear = document.getElementById("year_value");
        var fMonth = document.getElementById("month_value");
        var fDay = document.getElementById("day_value");
        var newWarn = document.querySelector(".warn.birth");
        obj.style.display = "none";
        var mark = 0;
        if (str == "year" && fObj.value == "") {
            fObj.value = "年";
        } else if (str == "month" && fObj.value == "") {
            fObj.value = "月";
        } else if (str == "day" && fObj.value == "") {
            fObj.value = "日";
        }
        if (/[0-9]/.test(fYear.value) && /[0-9]/.test(fMonth.value) && /[0-9]/.test(fDay.value)) {
            newWarn.style.display = "block";
            newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -240px no-repeat";
            mark = 0;
        } else {
            newWarn.style.display = "block";
            newWarn.style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -340px no-repeat";
            mark = 1;
        }
        if (mark === 1) {
            return false;
        }
    };

    return {

        //公有方法
        //定义本地存储,刷新时按钮与刷新前一样
        autoFocus: function () {

            if (sessionStorage.getItem("key") === "1") {
                indexAction().reg_qq();
                document.querySelector("#nickname").focus();
            } else if (sessionStorage.getItem("key") === "2") {
                indexAction().reg_email();
                document.querySelector("#email_name").focus();
            } else {
                indexAction().reg_qq();
                document.querySelector("#nickname").focus();
            }

        },

        //qq注册
        reg_qq: function () {
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
            sessionStorage.setItem("key", "1");
            if (document.querySelector("#nickname").value !== '') {//防止先注册过qq，未刷新直接切换到邮箱注册，昵称会有重复，但是未手动触发onblur事件导致昵称的重复
                privateWarnChange('.warn.nickname', 3);
            }
        },

        //邮箱注册
        reg_email: function () {

            document.querySelector("#email_name").focus();
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
            isclick3 = 0;
            sessionStorage.setItem("key", "2");
            if (document.querySelector("#nickname").value !== '') {
                privateWarnChange('.warn.nickname', 3);
            }
        },

        //创建邮箱
        create_email: function () {
            document.querySelectorAll(".email")[0].style.display = "none";
            document.querySelector(".regEmail").style.display = "block";
            document.querySelector(".registerEmail").style.display = 'block';
            document.querySelector("#register_email").focus();
            document.querySelector(".menu_7").style.display = "block";
        },

        //选择性别时改变其相应的背景图片。因为这里不是用的input中的radio,而是自定义的a标签及背景图片
        chooseMale: function () {
            var newOne = document.querySelectorAll(".sex_box a");
            newOne[0].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -267px -417px no-repeat';
            newOne[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -300px -322px no-repeat';
            chooseSex = 1;
        },

        chooseFemale: function () {
            var newOne = document.querySelectorAll(".sex_box a");
            newOne[1].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -267px -417px no-repeat';
            newOne[0].style.background = 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -300px -322px no-repeat';
            chooseSex = 0;
        },

        //根据现实情况计算了每年每月不同的天数,并且显示出来
        birthday_appear: function (obj_str) {
            var yearValue = document.getElementById('year_value');
            var monthValue = document.getElementById('month_value');
            var objs = document.querySelector(obj_str);

            if (obj_str == ".birthday_box2 ul") {
                for (var i = 2016; i > 1887; i--) {
                    document.getElementById("year").innerHTML += '<li value="' + i + '" id="year_' + (2016 - i) + '" onmousedown="indexC.change_birth_type(' + "'year_value','" + i + "年'" + ')">' + i + '年</li>';
                }
            }
            if (obj_str == ".birthday_box3 ul") {
                var theMonth = document.getElementById("month");
                if (yearValue.value.match(/\d+/g) == null || yearValue.value.match(/\d+/g) == "") {
                    theMonth.innerHTML = "";
                } else {
                    for (var j = 1; j < 13; j++) {
                        theMonth.innerHTML += '<li value="' + j + '" id="month_' + (j - 1) + '" onmousedown="indexC.change_birth_type(' + "'month_value','" + j + "月'" + ')">' + j + '月</li>';
                    }
                }
            }

            if (obj_str == ".birthday_box4 ul") {
                var theDay = document.getElementById("day");
                if (monthValue.value.match(/\d+/g) == 1 || monthValue.value.match(/\d+/g) == 3 || monthValue.value.match(/\d+/g) == 5 || monthValue.value.match(/\d+/g) == 7 || monthValue.value.match(/\d+/g) == 8 || monthValue.value.match(/\d+/g) == 10 || monthValue.value.match(/\d+/g) == 12) {
                    theDay.innerHTML = "";　//清空一下theDay，否则天数会一直叠加进ul中
                    for (var k = 1; k < 32; k++) {
                        theDay.innerHTML += '<li value="' + k + '" id="year_' + (k - 1) + '" onmousedown="indexC.change_birth_type(' + "'day_value','" + k + "日'" + ')">' + k + '日</li>';
                    }
                } else if (monthValue.value.match(/\d+/g) == 4 || monthValue.value.match(/\d+/g) == 6 || monthValue.value.match(/\d+/g) == 9 || monthValue.value.match(/\d+/g) == 11) {
                    theDay.innerHTML = "";
                    for (var k = 1; k < 31; k++) {
                        theDay.innerHTML += '<li value="' + k + '" id="year_' + (k - 1) + '" onmousedown="indexC.change_birth_type(' + "'day_value','" + k + "日'" + ')">' + k + '日</li>';
                    }
                } else if (monthValue.value.match(/\d+/g) == 2) {
                    if (yearValue.value.match(/\d+/g) % 4 == 0 && yearValue.value.match(/\d+/g) % 100 != 0 || yearValue.value.match(/\d+/g) % 400 == 0) {
                        theDay.innerHTML = "";
                        for (var k = 1; k < 30; k++) {
                            theDay.innerHTML += '<li value="' + k + '" id="year_' + (k - 1) + '" onmousedown="indexC.change_birth_type(' + "'day_value','" + k + "日'" + ')">' + k + '日</li>';
                        }
                    } else {
                        theDay.innerHTML = "";
                        for (var k = 1; k < 29; k++) {
                            theDay.innerHTML += '<li value="' + k + '" id="year_' + (k - 1) + '" onmousedown="indexC.change_birth_type(' + "'day_value','" + k + "日'" + ')">' + k + '日</li>';
                        }
                    }

                } else if (monthValue.value.match(/\d+/g) == null || monthValue.value.match(/\d+/g) == "") {   //undefined==null（不严格等于；===时是不等的）
                    theDay.innerHTML == "";
                }
            }
            //getComputedStyle方法能获取dom元素的所有css样式，但是是只读的；element.style只能获取行内样式不能获取css文件中的样式，但是是可读可写的
            if (window.getComputedStyle(objs).display == "none") {  //打开或者关闭生日栏的下拉显示框
                objs.style.display = "block";
            } else {
                objs.style.display = "none";
            }

        },

        //选择年月日在框中相应显示，用于js中birthday_appear函数
        change_birth_type : function (obj, str) {
            document.getElementById(obj).value = str;
        },


    //选择公历农历的时候input的相应值显示为哪个
        change_birth_type1: function (obj, str) {
            document.getElementById(obj).innerHTML = str;
        },

        //点击手机号码那个input出现要求发送验证码来验证手机
        verify_appear: function () {
            document.querySelector(".menu_8").style.display = "block";
        },

        //当input获得焦点是会相应的显示提示
        warnAppear: function (obj, a) {
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
                var hint = document.querySelectorAll(".hint_psw .hPsw");
                newWarn.style.color = "grey";
                newWarn.style.background = "none";
                newWarn.style.paddingLeft = "0";
                document.querySelector(".hint_psw").style.display = 'block';
                newWarn.style.display = 'none';
                // hint[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
                // hint[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
                // hint[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
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
        },

        //为了解决邮箱那边的onblur和onclick事件的冲突问题,用定时器来延迟onblur事件的触发
        warnChangeDelay: function () {
            setTimeout(privateWarnChange('.emailCode',1), 150);
        },

        //对填写的input的正则验证,以及判断是否符合填写要求
        warnChange: function (obj, a) {
            privateWarnChange(obj, a);
        },


        //生日填写失去焦点时发生的事情
        leaveBirth: function (str) {
            leaveB(str);
        },

        subEvent: function () {


            // var a = warnChange('.warn.nickname', 3);
            var b = privateWarnChange('.warn.password', 4);
            var c = privateWarnChange('.warn.confPsw', 5);
            var d = leaveB('year');
            var e = leaveB('month');
            var f = leaveB('day');
            var g = privateWarnChange('.warn.birthP', 6);
            var agreeSth = document.querySelector('.agreeSth');
            if (markA3 == 0 || b == false || c == false || d == false || e == false || f == false || g == false || agreeSth.checked === false) {

                return;
            }

            if (isclick3 == 1) {  //qq注册

                var h = privateWarnChange('.warn.tel', 7);
                if (h == false) {

                    return;
                }
                var QQData = {
                    nickname: $("#nickname").val(),
                    email: '',
                    password: $("#password").val(),
                    // sex: document.querySelector(".male_item").style.background == 'url("http://6.url.cn/zc/chs/img/ipt.png?v=10090") -267px -417px no-repeat' ? $(".male_item").text() : $(".female_item").text(),
                    sex: chooseSex === 1 ? $(".male_item").text() : $(".female_item").text(),
                    birthday: $("#birth_type_value").text() + ':' + $("#year_value").val() + '／' + $("#month_value").val() + '／' + $("#day_value").val(),
                    birthplace: $("#birthplace").val(),
                    telephone: $("#telephone").val()

                };
                $.ajax({
                    type: "POST",
                    url: "http://104.131.102.43?m=register",
                    dataType: "json",
                    data: QQData,
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            $(".state_fail").css("display", "none");
                            $(".state_success").css("display", "block");
                        } else {
                            $(".state_fail").css("display", "block");
                            $(".state_success").css("display", "none");
                        }
                    },
                    error: function (jqXHR) {
                        console.log("发生错误jqXHR" + jqXHR.status);
                    }
                });
            }
            if (isclick3 == 0) {//邮箱注册

                if ($("#register_email").val() == "") {
                    var i = privateWarnChange('.emailCode', 1);
                    if (i == false) {
                        return;
                    }
                    var EmailData = {
                        email: $("#email_name").val(),
                        nickname: $("#nickname").val(),
                        password: $("#password").val(),
                        sex: chooseSex === 1 ? $(".male_item").text() : $(".female_item").text(),
                        birthday: $("#birth_type_value").text() + ':' + $("#year_value").val() + '／' + $("#month_value").val() + '／' + $("#day_value").val(),
                        birthplace: $("#birthplace").val(),
                        telephone: ''
                        // telephone: $("#telephone").val()

                    };
                }
                else if ($("#email_name").val() == "") {
                    var j = privateWarnChange('.registerEmail', 2);
                    var h = privateWarnChange('.warn.tel', 7);
                    if (h == false || j == false) {
                        return;
                    }
                    var EmailData = {
                        email: $("#register_email").val(),
                        nickname: $("#nickname").val(),
                        password: $("#password").val(),
                        sex: chooseSex === 1 ? $(".male_item").text() : $(".female_item").text(),
                        birthday: $("#birth_type_value").text() + ':' + $("#year_value").val() + '／' + $("#month_value").val() + '／' + $("#day_value").val(),
                        birthplace: $("#birthplace").val(),
                        telephone: ''
                    };
                }
                $.ajax({
                    type: "POST",
                    url: "http://104.131.102.43?m=register",
                    dataType: "json",
                    data: EmailData,
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            $(".state_fail").css("display", "none");
                            $(".state_success").css("display", "block");
                        } else {
                            $(".state_fail").css("display", "block");
                            $(".state_success").css("display", "none");
                        }
                    },
                    error: function (jqXHR) {
                        console.log("发生错误jqXHR" + jqXHR.status);
                    }
                });
            }
        }


    };
};
//登录窗口
var loginWin = {
//用jquery中的animate函数实现向上移动的动画效果
    slide: function (obj, i) {
        var text = document.querySelector(obj);
        text.style.color = "#5188a6";
        $(obj).animate({top: "-16px"}, 260);
        document.querySelectorAll(".winItem")[i].style.borderColor = "#5188a6";
    },

    // //用css3中的transition属性来实现向上移动的文字效果
//     user.onfocus=function () {
//         var text = document.querySelector(".winTxt.one");
//         //     text.style.top="-16px";
//         text.style.color="#5188a6";
//         $(".winTxt.one").animate({top:"-16px"},260);
//         document.querySelectorAll(".winItem")[0].style.borderColor="#5188a6";
//     }
//     password.onfocus=function () {
//         var text = document.querySelector(".winTxt.two");
//         //     text.style.top="-16px";
//         text.style.color="#5188a6";
//         $(".winTxt.two").animate({top:"-16px"},260);
//         document.querySelectorAll(".winItem")[1].style.borderColor="#5188a6";
//     }

//点击右上角的登录按钮,显示登录窗
    loginApr: function () {

        var user = document.getElementById("username");
        var password = document.getElementById("winPsw");
        var logWin = document.getElementById("logWindow")
        logWin.style.display = "block";
        document.querySelector('.yesHint').style.display = 'none';
        document.querySelector('.noHint').style.display = 'none';
        var remPswIn = document.querySelector('.remPswIn');

        if (sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != '') {
            this.slide('.winTxt.one', 0);
            this.slide('.winTxt.two', 1);
            user.value = sessionStorage.getItem('user');
            password.value = sessionStorage.getItem('password');
        }
        //若value值为空,失去焦点,提示字又下滑回来了
        user.onblur = function () {

            if (user.value === "") {
                var text = document.querySelector(".winTxt.one");
                text.style.color = "rgba(0,0,0,0.5)";
                $(".winTxt.one").animate({top: "0px"}, 260);
                document.querySelectorAll(".winItem")[0].style.borderColor = "rgba(0,0,0,0.2)";
            }
        };
        password.onblur = function () {

            if (password.value === "") {
                var text = document.querySelector(".winTxt.two");
                text.style.color = "rgba(0,0,0,0.5)";
                $(".winTxt.two").animate({top: "0px"}, 260);
                document.querySelectorAll(".winItem")[1].style.borderColor = "rgba(0,0,0,0.2)";
            }
        };

        //当关闭登录窗口时要清除value其中的字
        function cancel() {
            if (user.value !== "") {
                user.value = '';
                user.onblur();
            }
            if (password.value !== "") {
                password.value = '';
                password.onblur();
            }
        }

        //加灰色的底层
        var underLayer = document.createElement("div");
        underLayer.id = "underLayer";
        underLayer.style.width = "100%";
        underLayer.style.height = "100%";
        underLayer.style.top = 0;
        underLayer.style.left = 0;
        underLayer.style.position = "fixed";
        underLayer.style.backgroundColor = "rgba(0,0,0,0.4)";
        //underLayer.style.opacity = "0.4";
        underLayer.style.zIndex = "9998";
        document.body.appendChild(underLayer);

        //点击灰色底层,登录窗和灰色底层消失
        underLayer.onclick = function () {
            logWin.style.display = "none";
            underLayer.style.display = "none";
            cancel();
        };
        document.querySelector(".reg").onclick = function () {
            logWin.style.display = "none";
            underLayer.style.display = "none";
            cancel();
        };
        document.querySelector(".close").onclick = function () {
            logWin.style.display = "none";
            underLayer.style.display = "none";
            cancel();
        };

        document.getElementById("winLogin").onclick = function () {
            var request = new XMLHttpRequest()
            if (/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/g.test(user.value)) {//user填写的是手机号
                request.open("POST", "http://104.131.102.43?m=login");
                var sendData = "telephone=" + user.value + "&password=" + password.value;
                request.send(sendData);
            } else if (/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)+$/g.test(user.value)) {//user填写的是邮箱
                request.open("POST", "http://104.131.102.43?m=login");
                var sendData = "email=" + user.value + "&password=" + password.value;
                request.send(sendData);

            } else {   //否则user就认为是昵称
                request.open("POST", "http://104.131.102.43?m=login");
                var sendData = "nickname=" + user.value + "&password=" + password.value;
                request.send(sendData);
            }
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var data = JSON.parse(request.responseText);
                        console.log(data);
                        if (data.msg === '登录成功') {
                            document.querySelector('.yesHint').style.display = 'block';
                            document.querySelector('.noHint').style.display = 'none';
                            if (remPswIn.checked === true) {
                                sessionStorage.setItem('user', user.value);
                                sessionStorage.setItem('password', password.value);
                            } else {
                                sessionStorage.setItem('user', '');
                                sessionStorage.setItem('password', '');
                            }
                        } else if (data.msg === '用户不存在') {
                            document.querySelector('.yesHint').style.display = 'none';
                            document.querySelector('.noHint').style.display = 'block';
                        }
                    } else {
                        alert("发生错误：" + request.status);
                    }
                }
            }
        }

    }
};

var commonAction = function () {

};