/**
 * Created by zbh on 2017/2/25.
 */
//第一页画canvas的js
(function () {

    // 动画重绘与浏览器保持一致
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    var particlesCount = 70;                  //粒子的总数
    var particles = [];                       //所有粒子的存储数组
    var minDis = 88;                          //设置两粒子间最小距离
    var p, p2;//存储某个点的pacticlesDraw对象
    var vWidth, vHeight, wWidth, wHeight;

    function getSize() {
        // wWidth = window.innerWidth;           //浏览器的可是宽度，即visual viewport
        vWidth = document.documentElement.clientWidth;
        //整个页面宽度，即ideal viewport，因为这里我的页面宽度viewport设置的基本小于设备的可视宽度，
        // 因此用documentElement不用window.innerHeight
        // wHeight = window.innerHeight;
        vHeight = document.documentElement.clientHeight;

        canvas.width = vWidth;
        canvas.height = vHeight;
    }

    //浏览器改变的时候触发resize事件的次数会特别频繁，稍微移动一下浏览器的边缘就是触发几十次resize事件，
    // 那么也就会重新计算几十次浏览器大小，比较消耗性能.
    // 所以我们可以在浏览器窗口改变的时候延缓200毫秒后执行计算浏览器大小的事件
    //也叫节流函数

    var winResize = function () {
        var timer = null;
        return function () {
            clearInterval(timer);
            setInterval(function () {
                getSize();
            }, 200)
        }
    };
    window.onresize = winResize();

    function Distance(p, p2) {
        var dist;
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= minDis) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(249,179,121,' + (1.2 - dist / minDis) + ')';
            ctx.moveTo(p.x, p.y);
            ctx.quadraticCurveTo(p.x + 0.15 * dx, p.y - 0.25 * dy, p2.x, p2.y);
            ctx.stroke();

            var nx = dx / 2000;
            // var ny = dy / 2000;
            p.x += nx;
            // p.y -= ny;
            p2.x -= nx;
            // p2.y -= ny;
        }

    }

    // 画画布
    function paintCanvas() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, vHeight);
        my_gradient.addColorStop(0, "#1A3742");
        my_gradient.addColorStop(1, "#9EA183");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(0, 0, vWidth, vHeight);
    }

    // 随机生成粒子
    function particlesDraw() {
        this.x = Math.random() * vWidth;
        this.y = Math.random() * vHeight;
        this.vx = -0.8 + Math.random() * 1.6;
        this.vy = -2 * Math.random();
        this.radius = 2.2;
        this.draw = function () {
            ctx.fillStyle = '#F9B379';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }

    // 画粒子的变化
    function Draw() {
        paintCanvas();
        for (var i = 0; i < particles.length; i++) {
            particles[i].draw();
        }

        for (var i = 0; i < particles.length; i++) {
            p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            //若粒子到达可是区域边缘就以相反的速度反射回来
            if ((p.x - p.radius) <= 0) {
                p.vx *= -1;
            } else if ((p.x + p.radius) >= vWidth) {
                p.vx *= -1;
            }
            if ((p.y - p.radius) <= 0) {
                p.y = vHeight - p.radius;
            }
            //下面是改变浏览器窗口大小时的操作，改变窗口大小后有的粒子会被隐藏，让他显示出来即可
            // if(p.x>innerWidth){
            //     p.x=vWidth-p.radius;
            //     p.vx *= -1;
            // }
            // if(p.x<0){
            //     p.x=0+p.radius;
            //     p.vx *= -1;
            // }
            // if(p.y>vHeight||p.y<0){
            //     p.y=vHeight;
            // }


            for (var j = i + 1; j < particles.length; j++) {
                p2 = particles[j];
                Distance(p, p2);
            }
        }
    }

    function animloop() {
        Draw();
        requestAnimFrame(animloop);

    }

    function init() {
        getSize();
        for (var i = 0; i < particlesCount; i++) {
            particles.push(new particlesDraw());
        }
        ;
        animloop();
    }

    init();

    function changeRadius(event) {
        var current_point = {
            x: null,
            y: null,
            max: 92
        };
        //pageX在ie9一下的兼容性
        if (event.pageX == null && event.clientX != null) {
            var eventDoc = event.target.ownerDocument || document;
            var doc = eventDoc.documentElement;
            var body = eventDoc.body;
            event.pageX = event.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
            event.pageY = event.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && body.clientTop || 0 );
        }
        current_point.x = event.pageX;
        current_point.y = event.pageY;

        for (var i = 0; i < particles.length; i++) {

            var range = Math.sqrt((particles[i].x - current_point.x) * (particles[i].x - current_point.x) + (particles[i].y - current_point.y) * (particles[i].y - current_point.y));

            if (range < current_point.max) {
                particles[i].radius = current_point.max / 4 + 2 - range / 4;
            } else {
                particles[i].radius = 2;
            }

        }
    }

    //事件监听器的兼容性
    function addEvent(eventTarget, eventType, eventHandler) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventType, eventHandler, false);
        } else {
            if (eventTarget.attachEvent) {
                eventType = "on" + eventType;
                eventTarget.attachEvent(eventType, eventHandler);
            } else {
                eventTarget["on" + eventType] = eventHandler;
            }
        }
    }

    addEvent(canvas, 'mousemove', function () {
        changeRadius(event);
    });

    //第四页中的云和水波的动画效果
    function cloudmove() {
        var cloud = document.querySelectorAll(".sky .icon");
        var water = document.querySelectorAll(".sea .icon");
        for (var i = 0; i < cloud.length - 1; i++) {
            // var cLeft = getComputedStyle(cloud[i]).left;
            var cLeft = getStyle(cloud[i],'left');
            // var newLeft = cLeft.replace('px', '');
            var intLeft = parseFloat(cLeft);
            // var cloudWidth = parseFloat(getComputedStyle(cloud[i]).width);
            var cloudWidth = parseFloat(getStyle(cloud[i],'width'));
            var speed = document.documentElement.clientWidth / (3000 + i * 20)
            if (intLeft >= document.documentElement.clientWidth) {
                cloud[i].style.left = -1 * cloudWidth + "px";
            } else {
                cloud[i].style.left = (intLeft + speed) + 'px';
            }
        }
        for (var i = 0; i < water.length; i++) {
            var cLeft = getStyle(water[i],'left');
            // var newLeft = cLeft.replace('px', '');
            var intLeft = parseFloat(cLeft);
            // var cloudWidth = parseFloat(getComputedStyle(water[i]).width)
            var cloudWidth = parseFloat(getStyle(water[i],'width'));
            var speed = document.documentElement.clientWidth / (2000 + i * 300)
            if (intLeft <= -1 * cloudWidth) {
                water[i].style.left = document.documentElement.clientWidth + "px";
            } else {
                water[i].style.left = (intLeft - speed) + 'px';
            }
        }
    }

    // setInterval(cloudmove, 30);
    function moveflash() {
        cloudmove();
        requestAnimFrame(moveflash);
    }

    moveflash();

})();

function getStyle (obj,attr) {

    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];

}
// 滚轮响应事件
// 参数：type有两个属性值，分别为"up"（滚轮向上）和"down"（滚轮向下）
function wheel() {
    // IE6
    window.onmousewheel = getWheelDalta;
    // Firefox
    if (window.addEventListener) {
        window.addEventListener("DOMMouseScroll", getWheelDalta, false);
    }
    // 获得鼠标滚轮事件
    function getWheelDalta(event) {
        var boat = document.querySelector(".sky .boat");
        // var boatLeft = parseFloat(getComputedStyle(boat).left) ;
        var boatLeft = parseFloat(getStyle(boat,'left'));
        var evaluation=document.querySelector(".self_evaluation");
        var evaTop=parseFloat(getStyle(evaluation,'top'));
        var event = event || window.event;
        var delta = 0;
        // delta的返回值为正时，表示向前滚动；delta的返回值为负时，表示向后滚动；
        if (event.wheelDelta) {
            // IE中，鼠标滚轮信息存放在wheelDelta属性中；向前滚动时，wheelDelta的值是120的倍数；向后滚动时，wheelDelta的值是-120的倍数；
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            // Firefox的鼠标滚轮信息存放在detail属性中；向前滚动，detail的值是-3的倍数；向后滚动，detail的值是3的倍数；
            delta = -event.detail / 3;
        }
        // 执行滚轮事件函数
        var lMin=document.documentElement.clientWidth/10;
        var lMax=document.documentElement.clientWidth/3;
        // var ratio=$('.sky').offset().top-$(window).scrollTop();
        // var clientHeight=document.documentElement.clientHeight;
        // console.log(ratio/clientHeight);
        if (delta > 0) {
            if (($(".sky").offset().top)*3/4 <$(window).scrollTop()&&boatLeft>lMin) {
                boat.style.left =boatLeft-delta*25+"px" ;
                // console.log("up="+delta);
                // if(evaTop<clientHeight*3/5){
                //     evaluation.style.top=evaTop+10*ratio/clientHeight+"px";
                //     evaluation.style.transform='scale('+ratio/clientHeight+')';
                //
                // }
            }
        } else {
            if ($(".sky").offset().top*3/4 < $(window).scrollTop()&&boatLeft<lMax) {
                boat.style.left = boatLeft-delta*25+"px";
                // console.log("down="+delta);
                // if(evaTop>clientHeight/12){
                //     evaluation.style.top=evaTop-10*ratio/clientHeight+"px";
                //     evaluation.style.transform='scale('+(1-ratio/clientHeight)+')';
                //
                // }
            }
        }
        // 阻止默认行为，防止当页面本身就存在滚动条时出现的异常//我这里不需要阻止默认行为
        // prevent(event);
        // function prevent(evt) {
        //     if (evt.preventDefault) {
        //         evt.preventDefault();
        //     } else {
        //         evt.returnValue = false;
        //     }
        // }
    }
}
wheel();








