/**
 * Created by Administrator on 2017/9/10 0010.
 */
var oSlider = document.getElementsByClassName("scroll_slider")[0];
var oTab = document.getElementsByClassName("scroll_tab")[0];
var oItems = oTab.getElementsByTagName("li");
var  scrollBar = document.getElementsByClassName("scroll_bar")[0];
var scrollCon = document.getElementsByClassName("scroll_con")[0];
var scrollWrap = document.getElementsByClassName("scroll_wrap")[0];
var len  = oItems.length;
for(var i = 0;i<len;i++){
    oItems[i].onclick=function(){
        for(var j = 0;j<len;j++){
            oItems[j].className="tab_item";
        }
        this.className="tab_item item_active";
    }
}

oSlider.onmousedown=function(ev){
    var e = ev||window.event;
    var y = e.clientY-this.offsetTop;
    //内容可以滚动的高度H
    var H = scrollCon.offsetHeight-scrollWrap.offsetHeight;
    var maxY = scrollBar.offsetHeight-oSlider.offsetHeight;
         document.onmousemove=function(ev){
             var e = ev || window.event;
             var sliderHeight= e.clientY-y;
             var percent = sliderHeight/maxY;
             if(percent<0){
                 percent=0;
             }else if(percent>1){
                 percent=1;
             }
             var h= H*percent;
             console.log(percent);
             if(sliderHeight<0){
                 sliderHeight=0;
             }else if(sliderHeight>(maxY)){
                 sliderHeight=maxY;
             }
             oSlider.style.top = sliderHeight+'px';
            //滚动条长度/滚动巢 = 滚动内容高度/滚动可视区

              scrollCon.style.marginTop=-h+'px';

         };
         document.onmouseup=function(){
                 document.onmousemove=null;
                 document.onmouseup=null;
         }
}
