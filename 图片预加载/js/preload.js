/**
 * Created by Administrator on 2017/10/24 0024.
 */
;(function($){
    'use strict';
    function Preload(imgs,options){
       this.img = (typeof imgs ==='string')? [imgs] : imgs;
       this.opt = $.extend({},Preload.DEFAULT,options);
       this._unorder();
    }
    Preload.DEFAULT={
      each:null, //每一张加载完执行
        all:null //所有加载完执行
    }
    Preload.prototype._unorder=function(){
        var count = 0;
        var imgs = this.img;
        var opt = this.opt;
        var len = imgs.length;

       $.each(imgs,function(index,src){
           var imgObj = new Image();
           $(imgObj).on('load error',function(){
             opt.each&&opt.each(count);
               if(count >= len-1){
                 opt.all && opt.all();
               }
               count++;
           })
           imgObj.src=src;
       })
    }
    $.extend({
        preload:function(imgs,opt){
            new Preload(imgs,opt);
        }
    })
})(jQuery);