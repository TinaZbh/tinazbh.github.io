/**
 * Created by zbh on 16/10/14.
 */

var a=2;     //默认第一次下的棋子为黑
var chessData=new Array(15);
for(var i=0;i<15;i++){     //创建二维数组chessData
    chessData[i]=new Array(15);
    for (var j=0;j<15;j++){
        chessData[i][j]=0;
    }
}
var s1,s2,s3=0;

// function add_play() {
//     var Ftd=document.getElementsByTagName('td');
//     for(var j=0,len=Ftd.length;j<len;j++){
//         Ftd[j].onclick=play;
//         Ftd[j].love=0;
//     }
// }

function play(i,j,obj) {
    if (s3==1){
        document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('http://ww1.sinaimg.cn/large/9e59afb4gw1f8rqdirl9qg20100103y9.gif')";
        // document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('images/black.gif')";
    }else if(s3==2){
        document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('http://ww4.sinaimg.cn/mw690/9e59afb4gw1f8rqdl9fjgg20100100r9.gif')";
        // document.getElementsByTagName('td')[s1*15+s2].style.backgroundImage="url('images/white.gif')";
    }
    if (chessData[i][j]){
        pop_appear("提示信息","这里已经有子了,请下到别处吧!");
        return ;
    }
    if(a==2){
        obj.style.backgroundImage="url('http://ww2.sinaimg.cn/mw690/9e59afb4gw1f8rqdi3cajg20100103y9.gif')";
        // obj.style.backgroundImage="url('images/black_cur.gif')";
        a=1;   //修改此值为1表示这次下的棋子为黑,因此下次下的棋子为白
        chessData[i][j]=1;

    }
    else{
        obj.style.background="url('http://ww2.sinaimg.cn/mw690/9e59afb4gw1f8rqditnvsg20100100ro.gif')";
        // obj.style.backgroundImage="url('images/white_cur.gif')";
        a=2;
        chessData[i][j]=2;
    }
    judgement(i,j,a);
    s1=i;s2=j;s3=a;
}
function judgement(i,j,a) {
    var count1=0;
    var count2=0;
    var count3=0;
    var count4=0;
    for(var y=j+1;y<15;y++){
        if(chessData[i][y]!=a){
            break;
        }
        count1++;
    }
    for(var y=j-1;y>=0;y--){
        if(chessData[i][y]!=a){
            break;
        }
        count1++;
    }
    for(var x=i+1;x<15;x++){
        if(chessData[x][j]!=a){
            break;
        }
        count2++;
    }
    for(var x=i-1;x>=0;x--){
        if(chessData[x][j]!=a){
            break;
        }
        count2++;
    }
    for(var x=i+1,y=j+1;x<15&&y<15;x++,y++){
        if(chessData[x][y]!=a){
            break;
        }
        count3++;
    }
    for(var x=i-1,y=j-1;x>=0&&y>=0;x--,y--){
        if(chessData[x][y]!=a){
            break;
        }
        count3++;
    }
    for(var x=i-1,y=j+1;x>=0&&y<15;x--,y++){
        if(chessData[x][y]!=a){
            break;
        }
        count4++;
    }
    for(var x=i+1,y=j-1;x<15&&y>=0;x++,y--){
        if(chessData[x][y]!=a){
            break;
        }
        count4++;
    }
    if (count1>=4||count2>=4||count3>=4||count4>=4){
        if (a==1){
            pop_appear("恭喜你","黑棋胜利");
        }
        else{
            pop_appear("恭喜你","白棋胜利");
        }
    }
}
function pop_appear(str1,str2) {
    var popup=document.getElementById("popup");
    var head=document.querySelector(".pop_head");
    var content=document.querySelector(".pop_content");
    head.innerHTML=str1;
    content.innerHTML=str2;
    popup.style.visibility="visible";
    var underLayer=document.createElement('div');
    underLayer.id='underLayer';
    underLayer.style.width='100%';
    underLayer.style.height='100%';
    underLayer.style.left=0;
    underLayer.style.top=0;
    underLayer.style.position='fixed';
    underLayer.style.backgroundColor='#000';
    underLayer.style.opacity='0.4';
    underLayer.style.zIndex='9998';
    document.body.appendChild(underLayer);
    underLayer.onclick=function () {
        popup.style.visibility='hidden';
        underLayer.style.visibility='hidden';
    }
}
function pop_hide() {
    var popup=document.getElementById("popup");
    popup.style.visibility="hidden";
    underLayer.style.visibility='hidden';
}
function play_again() {
    a=2;
    s3=0;
    for(var i=0;i<15;i++)
        for (var j=0;j<15;j++){
            chessData[i][j]=0;
        }
    window.history.go(0);
}