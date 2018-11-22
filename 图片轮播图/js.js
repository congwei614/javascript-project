/**
 * Created by Administrator on 2017/7/2 0002.
 */
window.onload = function(){
var container = document.getElementById('container');
var btn = document.getElementById('buttons');
var buttons=btn.getElementsByTagName('span');
var list=document.getElementById('list');
var prev =document.getElementById('prev');
var next =document.getElementById('next');
var index =1;
function showBtn(){
    for(var i=0;i<buttons.length;i++){
        if(buttons[i].className=='on'){
            buttons[i].className='';
        }
    }
    buttons[index-1].className='on'
}
function animate(offset){
    var time=300;
    var interval= 10;
    var speed=offset/(time/interval);
    var left=parseInt(list.style.left)+offset;
    function go(){
        if((speed>0&&parseInt(list.style.left)<left)||(speed<0&&parseInt(list.style.left)>left)){
            list.style.left=parseInt(list.style.left)+speed+'px';
            setTimeout(go,interval);
        }else{
            if(left<-3000){
                list.style.left=-600+'px';
            }
            if(left>-600){
                list.style.left=-3000+'px';
            }
        }

    }
    go();

};
var timer;
function play(){
    timer=setInterval(function(){
        next.onclick();
    },3000)
};
function stop(){
    clearInterval(timer);
};

    next.onclick=function(){
        animate(-600);
       if(index==5){
           index=1;
       }else{
           index=index+1;
       }
        showBtn();
    };
    prev.addEventListener('click',function(){
        animate(600);
       if(index==1){
           index=5;
       }else{
           index=index-1;
       }
        showBtn();
    });
    for(i=0; i<buttons.length;i++){
        buttons[i].addEventListener('click',function(){
            if(this.className=='on'){
                return;
            }
            var myIndex=parseInt(this.getAttribute('index'));
            var offset=-600*(myIndex-index);
            animate(offset);
            index=myIndex;
            showBtn();
            debugger
        })
    }
    container.onmouseover=stop;
    container.onmouseout=play;
play();
}