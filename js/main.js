/**
 * Created by zbh on 2017/2/28.
 */

// 滚轮响应事件
// 参数：type有两个属性值，分别为"up"（滚轮向上）和"down"（滚轮向下）
function wheel(upFn, downFn) {
    // IE6
    window.onmousewheel = getWheelDalta;
    // Firefox
    if(window.addEventListener) {
        window.addEventListener("DOMMouseScroll", getWheelDalta, false);
    }
    // 获得鼠标滚轮事件
    function getWheelDalta(event) {
        var event = event || window.event;
        var delta = 0;
        // delta的返回值为正时，表示向前滚动；delta的返回值为负时，表示向后滚动；
        if (event.wheelDelta) {
            // IE中，鼠标滚轮信息存放在wheelDelta属性中；向前滚动时，wheelDelta的值是120的倍数；向后滚动时，wheelDelta的值是-120的倍数；
            delta = event.wheelDelta/120;
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            // Firefox的鼠标滚轮信息存放在detail属性中；向前滚动，detail的值是-3的倍数；向后滚动，detail的值是3的倍数；
            delta = -event.detail/3;
        }
        // 执行滚轮事件函数
        if(delta > 0) {
            upFn();
        }else {
            downFn();
        }

        // 阻止默认行为，防止当页面本身就存在滚动条时出现的异常
        prevent(event);
        function prevent(evt){
            if(evt.preventDefault){
                evt.preventDefault();
            }else{
                evt.returnValue = false;
            }
        }
    }
}



//
// var $footer=$('#footer');
// $('.contact').mouseover(function () {
//     console.log('1');
//     $('.contact').style.display='none';
//     // $('.con_way').style.display='block';
//     $('.con_way').slideUp('fast');
// });
// $('.con_way').mouseout(function () {
//     console.log('2');
//     $('.con_way').slideDown();
//     $('.contact').slideUp();
// });