/**
 * Created by zbh on 16/10/14.
 */
var a=1;     //默认第一次下的棋子为黑
var s=0;
var Ftd=document.getElementsByTagName('td');
var chessData=new Array(15);
for(var i=0;i<15;i++){
    chessData[i]=new Array(15);
    for (var j=0;j<15;j++){
        chessData[i][j]=Ftd[s++];
    }
}
function add_play() {
    for(var j=0,len=Ftd.length;j<len;j++){
        Ftd[j].onclick=play;
        Ftd[j].love=0;
    }
}
function play() {

    if (this.love){
        pop_appear("提示信息","这里已经有子了,请下到别处吧!");
        return ;
    }
    if(a==1){
        this.style.backgroundImage="url('http://ww1.sinaimg.cn/large/9e59afb4gw1f8rqdirl9qg20100103y9.gif')";
        a=2;   //修改此值为2表示这次下的棋子为黑,因此下次下的棋子为白
        this.love="black";
    }
    else{
        this.style.background="url('http://ww4.sinaimg.cn/mw690/9e59afb4gw1f8rqdl9fjgg20100100r9.gif')";
        a=1;
        this.love="white";
    }
}
function pop_appear(str1,str2) {
    var popup=document.getElementById("popup");
    var head=document.querySelector(".pop_head");
    var content=document.querySelector(".pop_content");
    head.innerHTML=str1;
    content.innerHTML=str2;
    popup.style.visibility="visible";

}
function pop_hide() {
    var popup=document.getElementById("popup");
    popup.style.visibility="hidden";
}