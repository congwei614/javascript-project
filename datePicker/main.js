/**
 * Created by Administrator on 2017/11/9 0009.
 */
(function(){
    var datePicker = window.datePicker;
    var wrapper;
    var monthData = datePicker.getMonthData();
    console.log(monthData);
    datePicker.render = function(year,month){
        monthData = datePicker.getMonthData(year,month);
        console.log(monthData);
        var html = '';
        html +=
            '<div class="picker_header">'+
            '<a href="#" class="btn prev-btn">&lt;</a>'+
            '<a href="#" class="btn next-btn">&gt;</a>'+
            '<span class="current_date">'+monthData.year+'-'+monthData.month+'</span>'+
            '</div>'+
            '<div class="picker_body">'+
            '<table>'+
            '<thead>'+
            '<tr>'+
            '<th>日</th>'+
            '<th>一</th>'+
            '<th>二</th>'+
            '<th>三</th>'+
            '<th>四</th>'+
            '<th>五</th>'+
            '<th>六</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
        for(i= 0 ;i<monthData.day.length;i++){
            var data = monthData.day[i];
            if(i%7===0){
                html+='<tr>';
            }
            html+='<td data-date="'+data.day+'">'+data.showDay+'</td>';
            if(i%7===6){
                html+='</tr>';
            }
        }
        html +='</tbody>'+
            '</table>'+
            '</div>';
        return html;
    };
    datePicker.repeatRender=function(derective){
        var month,year;
        if(monthData){
            month = monthData.month;
            year = monthData.year;
        }
        if(derective === 'prev'){
          month = month-1;
          if(month===0){
              month=12;
              year--;
          }
        }else if(derective === 'next'){
            month = month+1;
            if(month===13){
                month=1;
                year++
            }
        }
        if(!wrapper){
            wrapper = document.createElement('div');
            wrapper.className='pickerBox';
            document.body.appendChild(wrapper);
        }

        wrapper.innerHTML =datePicker.render(year,month);
    }
    datePicker.init = function(el){
        datePicker.repeatRender();
        var isOpen = false;
        el.addEventListener('click',function(){
           if(!isOpen){
               wrapper.classList.add('pickerBox_show');
               position();
               isOpen = true;

           }else{
               wrapper.classList.remove('pickerBox_show');
               isOpen= false;
           }
        },false);
        window.onresize=function(){
            position();
        };
        //给日历定位
        function position(){
            var left = el.offsetLeft;
            var top = el.offsetTop;
            var height = el.offsetHeight;
            wrapper.style.left=left+'px';
            wrapper.top=top+height+2+'px';
        }
       wrapper.addEventListener('click',function(e){
           var e = e ? e : window.event;
           var target = e.traget || e.srcElement;
           if(!/btn/.test(target.className)) return;
           if(/prev-btn/.test(target.className)){
               datePicker.repeatRender('prev')
           }
           if(/next-btn/.test(target.className)){
               datePicker.repeatRender('next')
           }
       },false)
        wrapper.addEventListener('click',function(e){
            var target = e.target;
            if(target.nodeName.toLowerCase()==='td'){
                var input = el.getElementsByTagName('input')[0];
                var val = monthData.year+"-"+monthData.month+'-'+target.getAttribute('data-date');
                var inputData = new Date(monthData.year,monthData.month-1,target.getAttribute('data-date'));
                input.value=format(inputData);
                wrapper.classList.remove('pickerBox_show');
                isOpen= false;
            }
        },false)
    }
    function format(date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        moth = month<10 ? '0'+month :month;
        var day = date.getDate();
        day = day<10 ? '0'+day :day;
        var html = '';
        html =year+'-'+month+'-'+day;
        return html;
    }
})();