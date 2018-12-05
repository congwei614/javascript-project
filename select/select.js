;(function($,window,document,undefined){
    function Select(el,opt){
        this.$el = el;
        this.default={
            title:'选择类别',
            showTitle:true,
            wth:'',// ''100%，half:50%,third:30%
            require:true,
            items:[{
                id:"01",
                contxt:'项目一'
            },{
                id:"02",
                contxt:'项目二'
            }]
        }
        this.settings = $.extend({},this.default,opt);
    }
    Select.prototype={
        init:function(){
            var that = this,
                $html=$('<div class="title"><span class="eis-require">*</span>\n'+
                        that.settings.title+
                    '</div>\n'+
                '<div class="es-input-wrapper">\n' +
                '                <div class="input-box">\n' +
                '                   <input type="text" value="" placeholder="'+that.settings.title+'">\n'+
                '<i class="fa fa-angle-down"></i>\n' +
                '<ul class="eis-new-form-dropmenu"></ul>'+
                '                 </div>\n' +
                '            </div>');
            that.$el.append($html);
            var $list=that.$el.find('.eis-new-form-dropmenu'),
                $require = that.$el.find('.eis-require'),
                $input = that.$el.find('input[type="text"]'),
                $title=that.$el.find('.title'),
                $inputWrapper=that.$el.find('.es-input-wrapper');
            //判断显示标题
            if(that.settings.showTitle===false){
                $title.remove()
                $inputWrapper.css({'margin-left':"0"})
            }else{
                $inputWrapper.css({'margin-left':"100"})
            }
            if(!that.$el.hasClass('es-form-group')){
                that.$el.addClass('es-form-group')
            }
            switch (that.settings.wth){
                case '':
                    break
                case 'half':
                        that.$el.addClass('half');
                    break;
                case 'third':
                    that.$el.addClass('third')
            }
            // 添加下拉列表
            var $listHtml = '';
            if(that.settings.items && that.settings.items.length>0){
               for(var i = 0;i<that.settings.items.length;i++){
                   $listHtml+='<li class="eis-dropmenu-item">'+that.settings.items[i]['contxt']+'</li>'
               }
               $list.html($listHtml)
            }
            //判断显示必填
            if(that.settings.require){
                $require.text('*')
            }else(
                $require.text('')
            )
            //下拉展示收缩
            var $dropToggle = that.$el.find('.fa');
            $dropToggle.on('click',function(e){
                if(e){
                    e.stopPropagation();
                }else{
                    window.event.cancelBubble=true
                }
                if($(this).get(0).style['transform']==''){
                    $(this).get(0).style['transform']='translate(0,-50%) rotate(180deg)';
                }else if( $(this).get(0).style['transform']==='translate(0px, -50%) rotate(180deg)'){
                    $(this).get(0).style['transform']='translate(0,-50%) rotate(0deg)';
                }else{
                    $(this).get(0).style['transform']='translate(0,-50%) rotate(180deg)'
                }
                $list.slideToggle()
            })
            var $listItem = $list.find('.eis-dropmenu-item');
            $listItem.each(function(){
                $(this).on('click',function(e){
                    if(e){
                        e.stopPropagation();
                    }else{
                        window.event.cancelBubble=true
                    }
                    $input.val('');
                    $input.val($(this).text())
                    $list.slideToggle()
                })
            })
            $(document).on('click',function(){
                $list.hide();
            })
        }
    }
    $.fn.extend({
        select:function(opt){
            return this.each(function(){
                new Select($(this),opt).init()
            })
        }
    })
})(jQuery,window,document)