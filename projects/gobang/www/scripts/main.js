/**
 * Created by zbh on 2017/3/18.
 */

var playChess = (function () {
    var myName = "";//存储本人的nickname
    var oppoName = "";//存储对手的nickname
    var socket = io.connect('http://localhost:3000');
    var a = 0;
    //事件监听的兼容性处理
    function addEvent(target, event, fn) {
        var e = event || window.event;
        if (target.addEventListener) {
            target.addEventListener(e, fn, false);
        } else if (target.attachEvent) {
            target.attachEvent('on' + e, fn);
        } else {
            target['on' + e] = fn;
        }
    }

    //currentStyle兼容IE9以下，getAttribute和getAttribute是为了获取CSS样式申明对象上的属性值（直接属性名称）
    var getStyle = function (element, attr) {
        if (element.currentStyle) {
            return element.currentStyle.getAttribute(attr);
        } else {
            return window.getComputedStyle(element).getPropertyValue(attr);
        }
    };
    //登录框start
    //用jquery中的animate函数实现向上移动的动画效果
    var slide = function (obj, i) {
        var text = document.querySelector(obj);
        text.style.color = "#5188a6";
        $(obj).animate({top: "-16px"}, 260);
        document.querySelectorAll(".winItem")[i].style.borderColor = "#5188a6";
    };

    //当有人进入游戏状态或者结束游戏就会重新刷新一次用户列表，使游戏中的用户的字体变绿
    var changeTwoColor = function (state) {
        socket.emit("onChangeColor", myName, state);
        socket.emit("systemUpdate");
        if (state == "on_line") {
            for (var i = 0; i < 15; i++) {
                for (var j = 0; j < 15; j++) {
                    chessData[i][j] = 0;
                    document.getElementsByTagName('td')[i * 15 + j].style.backgroundImage = "";
                }
            }
        }
    };
    var loginApr = function () {
        var logWin = document.getElementById("logWindow");
        var user = document.getElementById("username");
        var password = document.getElementById("winPsw");
        var underLayer = document.getElementById("underLayer");
        // var remPswIn = document.querySelector('.remPswIn');
        logWin.style.display = "block";
        underLayer.style.display = "block";
        user.focus();
        document.querySelector('.yesHint').style.display = 'none';
        document.querySelector('.noHint').style.display = 'none';
        if (sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != '') {
            slide('.winTxt.one', 0);
            slide('.winTxt.two', 1);
            user.value = sessionStorage.getItem('user');
            password.value = sessionStorage.getItem('password');
        }
        //若value值为空,失去焦点,提示字又下滑回来了
        addEvent(user, 'blur', function () {
            if (user.value === "") {
                var text = document.querySelector(".winTxt.one");
                text.style.color = "rgba(0,0,0,0.5)";
                $(".winTxt.one").animate({top: "0px"}, 260);
                document.querySelectorAll(".winItem")[0].style.borderColor = "rgba(0,0,0,0.2)";
            }
        });
        addEvent(password, 'blur', function () {
            if (password.value === "") {
                var text = document.querySelector(".winTxt.two");
                text.style.color = "rgba(0,0,0,0.5)";
                $(".winTxt.two").animate({top: "0px"}, 260);
                document.querySelectorAll(".winItem")[1].style.borderColor = "rgba(0,0,0,0.2)";
            }
        });
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

        var disNone = function () {
            logWin.style.display = "none";
            underLayer.style.display = "none";
            cancel();
        };
        addEvent(document.querySelector(".reg"), 'click', function () {
            // disNone();
            logWin.style.display = "none";
            cancel();
            registerApr();
            // document.getElementById("regWindow").style.display="block";
        });
        addEvent(document.querySelector("#logWindow .close"), 'click', function () {
            disNone();
        });
        // addEvent(document.getElementById("winLogin"), 'click', function () {
        document.getElementById("winLogin").onclick=function () {
            var request = new XMLHttpRequest();
            // request.open("POST", "http://104.131.102.43?m=login");
            request.open("POST", "http://127.0.0.1:8081?m=login");
            var sendData = "nickname=" + user.value + "&password=" + password.value;
            request.send(sendData);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var data = JSON.parse(request.responseText);
                        console.log(data);
                        if (data.msg === '登录成功') {
                            document.querySelector('.yesHint').style.display = 'block';
                            document.querySelector('.noHint').style.display = 'none';
                            socket.emit("login", user.value);

                            // if (remPswIn.checked === true) {
                            //     sessionStorage.setItem('user', user.value);
                            //     sessionStorage.setItem('password', password.value);
                            // } else {
                            //     sessionStorage.setItem('user', '');
                            //     sessionStorage.setItem('password', '');
                            // }
                        } else if (data.msg === '用户不存在') {
                            user.focus();
                            document.querySelector('.yesHint').style.display = 'none';
                            document.querySelector('.noHint').style.display = 'block';
                        }
                    } else {
                        alert("发生错误：" + request.status);
                    }
                }
            }
        };

        // addEvent(password, 'keyup', function (e) {
        //     var userVal = user.value;
        //     var passwordVal = password.value;
        //     if (e.keyCode == 13 && userVal.trim().length != 0 && passwordVal.trim().length != 0) {
        //         socket.emit("login", userVal);
        //     } else if (userVal == "") {
        //         user.focus();
        //     }
        // });


    };
    //登录框end
    //注册start
    function registerApr() {
        var regWindow = document.getElementById("regWindow");
        var inPut = document.querySelectorAll(".item_box input");
        var itemBox = document.querySelectorAll(".item_box");
        var warn = document.querySelectorAll(".warn");
        var underLayer = document.getElementById("underLayer");
        var yesRegHint = document.querySelector('.yesRegHint');
        var noRegHint = document.querySelector('.noRegHint');
        regWindow.style.display = "block";
        underLayer.style.display = "block";
        inPut[0].focus();
        itemBox[0].style.borderColor = "rgb(81, 136, 166)";
        yesRegHint.style.display = 'none';
        noRegHint.style.display = 'none';
        var mark1 = 0, mark2 = 0, mark3 = 0;
        var warnAppear = function (a, str) {
            // if (inPut[a].value == "") {
            warn[a].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -216px no-repeat";
            // warn[a].style.background="url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -216px no-repeat";
            itemBox[a].style.borderColor = "rgb(81, 136, 166)";
            warn[a].style.color = "grey";
            warn[a].style.display = "block";
            warn[a].innerHTML = str;
            warn[a].style.paddingLeft = "15px";
            warn[a].style.paddingTop = "0px";
            // }
        };
        addEvent(inPut[0], "focus", function () {
            warnAppear(0, "请输入昵称");
        });
        addEvent(inPut[1], "focus", function () {
            warnAppear(1, "长度为6-16个字符,不能9位以下纯数字");
        });
        addEvent(inPut[2], "focus", function () {
            warnAppear(2, "请再次确认密码");
        });
        addEvent(inPut[0], "input", function () {
            warnAppear(0, "请输入昵称");
        });
        addEvent(inPut[1], "input", function () {
            warnAppear(1, "长度为6-16个字符,不能9位以下纯数字");
        });
        addEvent(inPut[2], "input", function () {
            warnAppear(2, "请再次确认密码");
        });

        addEvent(inPut[0], "blur", function () {
            if (inPut[0].value == "") {
                warn[0].innerHTML = '昵称不可为空';
                warn[0].style.color = "red";
                warn[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                // warn[0].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                itemBox[0].style.borderColor = "red";
                mark1 = 0;
                // return;
            } else {
                // $.post('http://104.131.102.43?m=nickname', {nickname: inPut[0].value}, function (data) {
                $.post('http://127.0.0.1:8081?m=nickname', {nickname: inPut[0].value}, function (data) {
                    console.log(data);
                    if (data.msg == 'good') {
                        warn[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -250px no-repeat";
                        // warn[0].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -250px no-repeat";
                        warn[0].innerHTML = 'OK';
                        warn[0].style.color = "grey";
                        itemBox[0].style.borderColor = "rgba(0,0,0,0.2)";
                        mark1 = 1;
                    } else {
                        warn[0].innerHTML = data.msg;
                        warn[0].style.color = "red";
                        warn[0].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                        // warn[0].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                        itemBox[0].style.borderColor = "red";
                        mark1 = 0;
                        // return;
                    }
                }, 'json');
            }
        });
        addEvent(inPut[1], "blur", function () {
            var sign = 1;
            if (inPut[1].value == "") {
                warn[1].innerHTML = '密码不可为空';
                warn[1].style.color = "red";
                warn[1].style.paddingLeft = "15px";
                warn[1].style.paddingTop = "0px";
                warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                itemBox[1].style.borderColor = "red";
                sign = 0;
                mark2 = 0;
            }

            if ((inPut[1].value.length < 6 && inPut[1].value.length > 0) || inPut[1].value.length > 16) {
                warn[1].innerHTML = "长度为6-16个字符！";
                warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -282px no-repeat";
                warn[1].style.color = "red";
                warn[1].style.paddingLeft = "15px";
                warn[1].style.paddingTop = "0px";
                itemBox[1].style.borderColor = "red";
                sign = 0;
                mark2 = 0;
            } else if (/\s/g.test(inPut[1].value)) {
                warn[1].innerHTML = "不能有空格！";
                warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -282px no-repeat";
                warn[1].style.color = "red";
                warn[1].style.paddingLeft = "15px";
                warn[1].style.paddingTop = "0px";
                itemBox[1].style.borderColor = "red";
                sign = 0;
                mark2 = 0;
            } else if (/^[0-9]{1,9}$/.test(inPut[1].value)) {
                warn[1].innerHTML = "不能9位以下纯数字！";
                warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -282px no-repeat";
                // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -282px no-repeat";
                warn[1].style.color = "red";
                warn[1].style.paddingLeft = "15px";
                warn[1].style.paddingTop = "0px";
                itemBox[1].style.borderColor = "red";
                sign = 0;
                mark2 = 0;
            } else if (inPut[1].value !== "") {
                warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -250px no-repeat";
                // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -250px no-repeat";
                warn[1].innerHTML = '';
                warn[1].style.color = "grey";
                warn[1].style.paddingLeft = "15px";
                warn[1].style.paddingTop = "0px";
                itemBox[1].style.borderColor = "rgba(0,0,0,0.2)";
                sign = 1;
                mark2 = 1;
            }

            if (sign == 1) {
                warn[1].style.paddingLeft = "0px";
                if (/^[a-zA-Z0-9]{6,7}$/g.test(inPut[1].value) || /^[A-Z]{6,16}$/g.test(inPut[1].value) || /^[0-9]{6,7}$/g.test(inPut[1].value) || /^[a-z]{6,16}$/g.test(inPut[1].value)) {
                    warn[1].innerHTML = "试试字母、数字、标点的组合";
                    warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -102px no-repeat";
                    // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -102px no-repeat";
                    warn[1].style.paddingTop = "10px";
                    warn[1].style.color = "grey";
                } else if (/^[a-z0-9A-Z]{8,16}$/g.test(inPut[1].value)) {
                    warn[1].innerHTML = "密码强度一般";
                    warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -145px no-repeat";
                    // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -145px no-repeat";
                    warn[1].style.paddingTop = "10px";
                    warn[1].style.color = "grey";
                } else {
                    warn[1].innerHTML = "密码强度好！";
                    warn[1].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -192px no-repeat";
                    // warn[1].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -192px no-repeat";
                    warn[1].style.paddingTop = "10px";
                    warn[1].style.color = "grey";
                }
            }

        });
        addEvent(inPut[2], "blur", function () {
            if (inPut[2].value == "") {
                warn[2].innerHTML = '请再次输入密码';
                warn[2].style.color = "red";
                warn[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                // warn[2].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                itemBox[2].style.borderColor = "red";
                mark3 = 0;
            } else if (inPut[2].value !== document.getElementById("password").value) {
                warn[2].innerHTML = '密码不一致';
                warn[2].style.color = "red";
                warn[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                // warn[2].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                itemBox[2].style.borderColor = "red";
                mark3 = 0;
            } else {
                warn[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -250px no-repeat";
                // warn[2].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -250px no-repeat";
                warn[2].innerHTML = '正确';
                warn[2].style.color = "grey";
                mark3 = 1;
                itemBox[2].style.borderColor = "rgba(0,0,0,0.2)";
            }
            // if (mark === 1) {
            //     return false;
            // }
        });

        //当关闭登录窗口时要清除value其中的字
        function cancel() {
            for (var i = 0; i < 3; i++) {
                if (inPut[i].value !== "") {
                    inPut.value = '';
                }
            }
        }

        var disNone = function () {
            regWindow.style.display = "none";
            underLayer.style.display = "none";
            cancel();
        };
        addEvent(document.querySelector(".reg1"), 'click', function () {
            regWindow.style.display = "none";
            cancel();
            loginApr();
        });
        addEvent(document.querySelector("#regWindow .regClose"), 'click', function () {
            disNone();
        });
        addEvent(document.getElementById("regLogin"), 'click', function () {
            if (inPut[1].value !== inPut[2].value) {
                warn[2].innerHTML = '密码不一致';
                warn[2].style.color = "red";
                warn[2].style.background = "url('http://6.url.cn/zc/chs/img/pwd_sprite.png?v=10090') 0 -348px no-repeat";
                // warn[2].style.background = "url('http://wx3.sinaimg.cn/mw690/9e59afb4gy1fdxtha9punj204g0cgq2q.jpg') 0 -348px no-repeat";
                itemBox[2].style.borderColor = "red";
            }
            if (mark1 === 1 && mark2 === 1 && mark3 === 1 && inPut[1].value === inPut[2].value) {
                var QQData = {
                    nickname: $("#nickname").val(),
                    password: $("#password").val()
                };
                $.ajax({
                    type: "POST",
                    // url: "http://104.131.102.43?m=register",
                    url: "http://127.0.0.1:8081?m=register",
                    dataType: "json",
                    data: QQData,
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            $(".noRegHint").css("display", "none");
                            $(".yesRegHint").css("display", "block");
                        } else {
                            $(".noRegHint").css("display", "block");
                            $(".yesRegHint").css("display", "none");
                            // inPut[0].focus();
                        }
                    },
                    error: function (jqXHR) {
                        console.log("发生错误jqXHR" + jqXHR.status);
                    }
                });
            }

        });

    };
    //注册end

    //点击登录显示登录框
    var loginAppear = function () {
        loginApr();
    };
    var regAppear = function () {
        registerApr();
    };
    //五子棋部分start
    var chessData = new Array(15);
    for (var i = 0; i < 15; i++) {     //创建二维数组chessData
        chessData[i] = new Array(15);
        for (var j = 0; j < 15; j++) {
            chessData[i][j] = 0;
        }
    }

    var emitPopRes = function (popStr) {
        var data1 = {
            sto: oppoName,
            sfrom: myName
        };
        if (document.getElementById("_" + oppoName).className == "in_game") {
            popAppear("提示信息", oppoName + "正在游戏中", "确定", "取消", 1);
            return false;
        }
        if (popStr == "yes") {
            // a = 1;//被邀请者为白子
            changeTwoColor("in_game");
        }
        socket.emit("popRes", popStr, JSON.stringify(data1));
    };

    var popAppear = function (str1, str2, str3, str4, popType) {
        var popup = document.getElementById("popup");
        var head = document.querySelector(".pop_head");
        var content = document.querySelector(".pop_content");
        var popClose = document.querySelector('.pop_close');
        var popOther = document.querySelector('.pop_other');
        var underLayer = document.getElementById("underLayer");
        var _str;
        head.innerHTML = str1;
        content.innerHTML = str2;
        popClose.innerHTML = str3;
        popOther.innerHTML = str4;
        popup.style.display = "block";
        underLayer.style.display = "block";
        //由于js的异步执行，使得用监听函数addEventListener会使得对popType的判断出错；
        popClose.onclick = function () {
            popup.style.display = "none";
            underLayer.style.display = 'none';
            if (popType == 2) {
                _str = "yes";
                emitPopRes(_str);
            }
        };

        popOther.onclick = function () {
            popup.style.display = "none";
            underLayer.style.display = 'none';
            if (popType == 2) {
                _str = "no";
                emitPopRes(_str);
            }
        };
        // if(popType===3){
        //     setTimeout(function () {
        //         popup.style.display = "none";
        //         underLayer.style.display = 'none';
        //     },3000);
        // }
    };

    var judgement = function (i, j, aa) {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        for (var y = j + 1; y < 15; y++) {
            if (chessData[i][y] !== aa) {
                break;
            } else {
                count1++;
            }
        }
        for (var y = j - 1; y >= 0; y--) {
            if (chessData[i][y] !== aa) {
                break;
            } else {
                count1++;
            }
        }
        for (var x = i + 1; x < 15; x++) {
            if (chessData[x][j] !== aa) {
                break;
            } else {
                count2++;
            }
        }
        for (var x = i - 1; x >= 0; x--) {
            if (chessData[x][j] !== aa) {
                break;
            } else {
                count2++;
            }
        }
        for (var x = i + 1, y = j + 1; x < 15 && y < 15; x++, y++) {
            if (chessData[x][y] !== aa) {
                break;
            } else {
                count3++;
            }
        }
        for (var x = i - 1, y = j - 1; x >= 0 && y >= 0; x--, y--) {
            if (chessData[x][y] !== aa) {
                break;
            } else {
                count3++;
            }
        }
        for (var x = i - 1, y = j + 1; x >= 0 && y < 15; x--, y++) {
            if (chessData[x][y] !== aa) {
                break;
            } else {
                count4++;
            }
        }
        for (var x = i + 1, y = j - 1; x < 15 && y >= 0; x++, y--) {
            if (chessData[x][y] !== aa) {
                break;
            } else {
                count4++;
            }
        }

        var disconnection = function () {
            a = 0;
            changeTwoColor("on_line");
        };
        if (count1 >= 4 || count2 >= 4 || count3 >= 4 || count4 >= 4) {
            if (aa == 2) {
                popAppear("恭喜你", "黑棋胜利,游戏结束", "确定", "取消", 1);
                disconnection();
            }
            else if (aa == 1) {
                popAppear("恭喜你", "白棋胜利,游戏结束", "确定", "取消", 1);
                disconnection();
            }
        }
    };
    var setPlaying = function (i, j, aa) {

        if (aa == 2) {
            // obj.style.backgroundImage = "url('http://ww2.sinaimg.cn/mw690/9e59afb4gw1f8rqdi3cajg20100103y9.gif')";
            // obj.style.backgroundImage="url('../images/black_cur.gif')";
            document.getElementsByTagName('td')[i * 15 + j].style.backgroundImage = "url('http://ww1.sinaimg.cn/large/9e59afb4gw1f8rqdirl9qg20100103y9.gif')";
            // document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('../images/black.gif')";
            chessData[i][j] = 2;
            a = 1;

        }
        else if (aa == 1) {
            // obj.style.backgroundImage = "url('http://ww2.sinaimg.cn/mw690/9e59afb4gw1f8rqditnvsg20100100ro.gif')";
            // obj.style.backgroundImage="url('../images/white_cur.gif')";
            document.getElementsByTagName('td')[i * 15 + j].style.backgroundImage = "url('http://ww4.sinaimg.cn/mw690/9e59afb4gw1f8rqdl9fjgg20100100r9.gif')";
            // document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('../images/white.gif')";
            chessData[i][j] = 1;
            a = 2;
        }

        judgement(i, j, aa);
    };
    //五子棋部分end

    var lisConnect = function () {
        socket.on('connect', function () {
            var info = document.querySelector('.info');
            info.style.display = 'none';
            loginApr();
        });
    };

    var lisLoginSuccess = function () {
        var underLayer = document.getElementById('underLayer');
        var user = document.getElementById("username");
        var yourself = document.querySelector('.yourself');
        var logWin = document.getElementById("logWindow");
        socket.on('loginSuccess', function () {
            yourself.innerHTML = "Hi," + user.value;
            logWin.style.display = 'none';
            underLayer.style.display = "none";
            myName = user.value;
        });
    };
    var putError = function () {
        var underLayer = document.getElementById('underLayer');
        var info = document.querySelector('.info');
        socket.on('error', function (err) {
            if (underLayer.style.display == 'none') {
                underLayer.style.display = 'block';
                info.innerHTML = "!fail to connect :(";
            } else {
                info.innerHTML = "!fail to connect :(";
            }
        })
    };
    var lisSystem = function () {
        var peopleTable = document.getElementById('people_table');
        socket.on('system', function (otherUsers) {
            var insertLi = "";
            var counts = 0;
            var usersObj = JSON.parse(otherUsers);
            for (var k in usersObj) {
                if (usersObj.hasOwnProperty(k)) {
                    counts++;
                    // usersSave.push(k);
                    insertLi += "<li id='_" + k + "' class='" + usersObj[k] + "' onclick='playChess.selectOne(this)' onkeyup='playChess.selectEnter(this)'>" + k + "</li>";
                }
            }
            peopleTable.innerHTML = insertLi;
            document.querySelector(".online_sum span").innerHTML = counts;
        });
    };
    //当选中列表中某个人时触发的事件
    var selectOne = function (obj) {
        if (myName == "") {
            popAppear("提示信息", "请先登录才能邀请他人加入游戏哦！", "确定", "取消", 1);
            return false;
        }
        if (obj.innerHTML == myName) {
            popAppear("提示信息", "不可以邀请自己哦！", "确定", "取消", 1);
            return false;
        }
        if (obj.className == "in_game") {
            popAppear("提示信息", "该人正在游戏中！", "确定", "取消", 1);
            return false;
        }
        var opponent = obj.innerHTML;
        var data = {
            sto: opponent,
            sfrom: myName,
        };
        socket.emit("invitation", JSON.stringify(data));
        popAppear("提示信息", "邀请已发出，请耐心等待", "确定", "取消", 1);
    };
    var selectEnter = function (obj) {
        var e = event || window.event;
        if (e.keyCode == 13) {
            selectOne(obj);
        }
    };

    //看被邀请者是否同意加入游戏
    var lisBeInvited = function () {
        socket.on("beInvited", function (opponent) {
            oppoName = opponent;
            popAppear("邀请", opponent + "邀请你加入游戏。若同意你即为白子，后行！", "同意", "拒绝", 2);
        });
    };
    //根据被邀请者的回答作出反应
    var lisPopReply = function () {
        socket.on("popReply", function (popStr, opponent) {
            if (popStr == "yes") {
                a = 2;//被邀请人同意后，邀请者分配为黑子
                oppoName = opponent;
                changeTwoColor("in_game");
                popAppear("恭喜", opponent + "接受了你的邀请。你为黑子你先行！", "开始游戏", "关闭", 1);
            } else {
                popAppear("抱歉", opponent + "拒绝了你的邀请", "确定", "取消", 1);
            }
        })
    };
    var lisTranLocation = function (i, j, a) { //传递位置
        var positionInfo = {
            sto: oppoName,
            sfrom: myName,
            cols: i,
            rows: j,
            a: a
        };

        socket.emit("tranLocation", JSON.stringify(positionInfo));
    };
    var lisSetLocation = function () {  //设置位置
        socket.on("setLocation", function (data) {
            var newData = JSON.parse(data);
            setPlaying(newData.cols, newData.rows, newData.a);
        })
    };
    var playing = function (i, j, obj) {
        if (myName == "") {
            popAppear("提示信息", "请先登录", "确定", "取消", 1);
            return;
        }
        if (myName != "") {
            if (oppoName == "") {
                popAppear("提示信息", "请先在右侧列表邀请同伴加入游戏或选择人机大战", "确定", "取消", 1);
                return;
            }
        }

        if (chessData[i][j]) {
            popAppear("提示信息", "这里已经有子了,请下到别处吧!", "确定", "取消", 1);
            return;
        }
        if (!document.getElementById("_" + oppoName) || document.getElementById("_" + oppoName).className != "in_game"&&document.getElementById("_" + myName).className == "in_game") {
            popAppear("提示信息", "对方掉线了", "确定", "取消", 1);
            changeTwoColor("on_line");
            return;
        }
        if (a == 2) {
            obj.style.backgroundImage = "url('http://ww1.sinaimg.cn/large/9e59afb4gw1f8rqdirl9qg20100103y9.gif')";
            // obj.style.backgroundImage="url('../images/black.gif')";
            chessData[i][j] = 2;
            lisTranLocation(i, j, 2);
        }
        else if (a == 1) {
            obj.style.backgroundImage = "url('http://ww4.sinaimg.cn/mw690/9e59afb4gw1f8rqdl9fjgg20100100r9.gif')";
            // obj.style.backgroundImage="url('../images/white.gif')";
            chessData[i][j] = 1;
            lisTranLocation(i, j, 1);
        }
        if (a) {
            judgement(i, j, a);
        }
        if (a != 0) {
            a = 0;
        }
    };
    var lisSearchSb = function () {
        var searchIcon = document.querySelector(".search_wrapper .icon");
        var searchBox = document.querySelector(".search_box");
        var onlineSum = document.querySelector(".online_sum");
        var peopleTable = document.getElementById('people_table');
        var searchOne = function (a) {
            socket.emit("chooseUsers", myName);
            socket.on("usersFilter", function (users) {
                var insertLi = "";
                var usersObj = JSON.parse(users);
                for (var k in usersObj) {
                    if (k.indexOf(searchBox.value) >= 0 || a === 0) {
                        if (usersObj.hasOwnProperty(k)) {
                            insertLi += "<li id='_" + k + "' class='" + usersObj[k] + "' onclick='playChess.selectOne(this)' onkeyup='playChess.selectEnter(this)'>" + k + "</li>";
                        }
                    }
                }
                peopleTable.innerHTML = insertLi;
            });
        };

        addEvent(searchIcon, "click", function () {
            if (getStyle(searchBox, "display") == "none") {
                onlineSum.style.display = "none";
                searchBox.style.display = "block";
                searchBox.focus();
            } else {
                if (searchBox.value == "") {
                    onlineSum.style.display = "block";
                    searchBox.style.display = "none";
                } else {
                    searchOne(1);
                }
            }
        });
        addEvent(searchBox, "keyup", function (e) {
            var e = e || window.e;
            if (e.keyCode == 13 && searchBox.value != "") {
                searchOne(1);
            }
        });
        var counts = 0;
        addEvent(searchBox, "keydown", function (e) {
            var e = e || window.e;
            var peopleTableLi = document.querySelectorAll("#people_table li");
            var len = peopleTableLi.length;
            for (var i = 0; i < len; i++) {
                peopleTableLi[i].style.backgroundColor = "white";
            }
            var changes = function (count) {
                if (count == 0) {
                    peopleTable.scrollTop = 0;
                } else if (count * 29 < 556) {//计算li的滚动条有没有出来
                    peopleTable.scrollTop = 0;
                    peopleTableLi[count - 1].style.backgroundColor = "#B9B9B9";

                } else {
                    peopleTable.scrollTop += 29;
                    peopleTableLi[count - 1].style.backgroundColor = "#B9B9B9";
                }
            };
            if (len != 0 && e.keyCode == 40) {//下键
                counts++;
                if (counts > len) {
                    counts = counts % (len + 1);
                }
                changes(counts);
            }
            if (len != 0 && e.keyCode == 38) {//上键
                counts--;
                if (counts < 0) {
                    counts = (len + 1 - counts) % (len + 1);
                }
                changes(counts);
            }
        });
        addEvent(searchBox, "input", function () {
            if (searchBox.value != "") {
                searchOne(1);
            } else {
                searchOne(0);
            }
        });
    };
    return {
        init: function () {
            lisConnect();
            lisLoginSuccess();
            putError();
            lisSystem();
            lisBeInvited();
            lisPopReply();
            lisSetLocation();
            lisSearchSb();
        },
        slide: slide,
        playing: playing,
        selectOne: selectOne,
        selectEnter: selectEnter,
        loginAppear: loginAppear,
        regAppear: regAppear
    }
})();
(function () {
    playChess.init();
})();
function play(i, j, obj) {
    playChess.playing(i, j, obj);
}



