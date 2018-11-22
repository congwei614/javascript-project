/**
 * Created by Administrator on 2017/7/19 0019.
 */
;$(document).ready(function(){
    var checkInputs = $("input.check");//获取所有的checkbox;
    var checkAllInputs=$("input.check_all");//获取所有的checkAllBox;
    var cartSingle =$(".cart_table_list .cart_single");
    var len = cartSingle.length;
    var selected=$(".cart_foot .selected span");
    var total =$(".cart_foot .total span");
    var selectedTotal=$(".cart_foot .selected");
    var selected_view=$(".cart_foot .selected_view");
    var deleteAll = $(".cart_foot .delete");
    var div = document.getElementByT
    /**
     * 结算总金额
     * */
    function getTotal(){
        var _selected=0;
        var _total=0;
        var _htmlStr='';
       cartSingle.each(function(index){
           var m =$(this);
           if(m.find("input.check").is(":checked")){
               m.addClass("active");
               _selected+=parseInt(m.find("input.number").val());
               _total+=parseFloat(m.find(".p_total span").html());
               _htmlStr+='<div><img src="'+m.find('.p_info img').prop('src')+'" ><span class="del" data-index="'+index+'">取消选择</span></div>';
           }
           else{
               m.removeClass("active");
           }
       });
        selected.html(_selected);
        total.html("¥"+_total.toFixed(2));
        selected_view.html(_htmlStr);
        if(_selected==0){
            selected_view.removeClass("show");
            selectedTotal.find("i").hide()
        }
    }
/***
 * 结算单个商品的金额
 * */
    function getSubTotal(index,ele) {
      var price =parseFloat(cartSingle.eq(index).find(".p_price span").html());
      var count = parseInt(cartSingle.eq(index).find("input.number").val());
      var subTotal =parseFloat(price*count).toFixed(2);
      cartSingle.eq(index).find(".p_total span").html(subTotal);
}
    /***
     * 遍历所有的checkbox 然后绑定点击事件进行结算
     * */
     checkInputs.each(function(){
         var m =$(this);
         m.on("click",function(){

             if(m.hasClass("check_all")&&m.prop("checked")){
                checkInputs.each(function(){
                    $(this).prop("checked", true);
                });
             }else if(m.hasClass("check_all")&&!m.prop("checked")) {
                 checkInputs.each(function(){
                     $(this).prop("checked",false);
                 });
             }
             //如果有一个未选中，则全选框不为勾选
             if(!m.prop('checked')){
                 checkAllInputs.each(function(){
                     $(this).prop("checked",false);
                 });
             }

            getTotal();
     })

     });
/**
 * 点击已选中商品，显示选中商品列表selected_view;
 * */
     selectedTotal.on("click",function(){
         if(selected.html()!=0){
             if(!selected_view.hasClass("show")){
                 selected_view.addClass("show");
                 selectedTotal.find("i").show()
             }
             else if(selected_view.hasClass("show")){
                 selected_view.removeClass("show");
                 selectedTotal.find("i").hide()
             }
         }

     });

     /**
      * 选中商品列表中进行取消选择
      * */
     selected_view.on("click",function(e){
         var ele = e.target||e.srcElement;;
          if(ele.className=='del'){
           var index = e.target.getAttribute('data-index');
           cartSingle.eq(index).find("input.check").click();
           cartSingle.eq(index).find("input.check").prop('checked',false);

          }
     });
     /**
      * 单个商品 增加和减少 使用事件代理 直接绑定到cart_single
      * */
     cartSingle.each(function(index,ele){
         var m =$(this);
         var p_total=m.find("input.number");
         var del =m.find(".p_total span");
         m.on('click',function(e){
             var element=e.target || e.srcElement;
             var cls =element.className;
             var input=m.find("input.number");
             var v=parseInt(m.find("input.number").val());
             switch(cls){
                 case 'reduce':
                     input.val(v-1);
                     if(parseInt(input.val())<1){
                         input.val(1);
                     }
                     getSubTotal(index,ele);
                     break;
                 case 'add':
                     m.find("input.number").val(v+1);
                     getSubTotal(index,ele);
                     break;
                 case 'delete':
                     m.find("input.check").prop('checked',false);
                     m.remove();
                     break;
                 default:
                     break;
             }
             getTotal();
         });
         /*
         * 手动输入商品数量进行计算
         * */
         p_total.on('keyup',function(){
             var m =$(this);
             val = parseInt(m.val());
          if(isNaN(val)||val<1){
              val =1;
          }
             m.val(val);
             getSubTotal(index,ele);
             getTotal();
         });

     });
/**
 * 全部删除商品
 * */
        deleteAll.on('click',function(){
            if(selected.html()!='0'){
                cartSingle.each(function(){
                    if($(this).find('input.check').prop('checked')){
                        $(this).find('input.check').prop('checked',false)
                        $(this).remove();
                    }
                });
            }


                getTotal();//更新商品总数


        });
    /**
     * 当商品列表的高度大于屏幕的高度，则cart_foot则被固定字啊屏幕底部
     * */
        $(window).on('scroll',function(){

            //最后一个cartsingle到浏览器顶部的偏移距离
           var offsetTop = cartSingle.eq(len-1).offset().top;
           //单个cartsingle的高度
            var top = cartSingle.eq(len-1).height();
            var winHeight= $(window).height();
           if((offsetTop+top)>winHeight){
               $(".cart_foot").addClass('cart_foot_fixed');
           }else{
               $(".cart_foot").removeClass('cart_foot_fixed');
           }
        })


})