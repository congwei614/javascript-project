/**
 * Created by Administrator on 2018/1/10 0010.
 */
;(function($,window,document,undefinded){
    'use strict'
    var AutoHeight = function(ele,options) {
        this.$ele = ele;
        this.defaults = {
            'width': '200px',
            'height': '20px',
            'maxHeight': '300px'
        }
        this.settings=$.extend({},this.defaults,options);
        this.autoHeight();
    }
    AutoHeight.prototype={
        autoHeight:function(){
            var _this = this,
                config = this.settings,
                $ele = this.$ele;
            $ele.css({'height':config.height,'width':config.width,'overflow-y':'hidden'}).height($ele[0].scrollHeight);
            $ele.on('input propertychange',function(){
                $(this).height($(this)[0].scrollHeight);
                if(parseInt($(this)[0].scrollHeight)>60){
                    $(this).height(60);
                }else{
                    $(this).height($(this)[0].scrollHeight);
                }
            })

        }
    }
    $.fn.extend({
        textAuto:function(options){
            return this.each(function(){
                new AutoHeight($(this),options);
            })
        }
    })

})(jQuery,window,document)