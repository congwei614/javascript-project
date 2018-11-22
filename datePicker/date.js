/**
 * Created by Administrator on 2017/11/8 0008.
 */
(function(){
    var datePicker = {};
    datePicker.getMonthData=function(year,month){
        var res=[];
        if(!year || !month){
            var date = new Date();
            month = date.getMonth()+1;
             year = date.getFullYear();
        }
        //这个月的第一天是周几
        var first = new Date(year,month - 1);
        var weekDay = first.getDay();
          //上个月的最后一天 也就是这个月的第0天
        var last = new Date(year,month-1,0);
        var lastDay = last.getDate();
        /*日历表中第一行应该放上个月的几天
        * 如果这个月第一天是周一 前面放1天
        * 如果周六前面放六天
        * */
        var lastCount = weekDay;
        //本月的最后一天是哪一天
        var currentLast = new Date(year,month,0);
        var currentLastDay = currentLast.getDate();
        // 循环获取当月六周所有数据
        for(var i = 0;i< 7*6;i++){
            var day = i+1-lastCount;
            var showDay = day;
            var showMonth = month;
            //如果day 是上一个月的时间
            if(day <= 0){
                showMonth = month-1;
                showDay =lastDay+day;
            }
            if(day > currentLastDay){
                showMonth= month+1;
                showDay = day - currentLastDay;
            }
            if(showMonth === 0) showMonth =12;
            if(showMonth === 13) showMonth = 1;
            res.push({
                day:day,
                showDay:showDay,
                showMonth:showMonth
            })
        }
        return {
            day:res,
            month:month,
            year:year
        };
    };

    window.datePicker = datePicker
})();