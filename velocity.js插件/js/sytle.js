(function($){
 var container =$(".container");
 var box = $(".box");
 var log =box.find(".log");
 var back= $(".back");
 var close =$(".close");
 var btn =$("#btn");
 var img =back.find("img");
 $.Velocity.RegisterEffect('slideUpIn',{
     defaultDuration:500,
     calls:[
         [{opacity:[1,0],translateY:[0,100]}]
     ]
 });
 $.Velocity.RegisterEffect("slideDownOut",{
     defaultDuration:500,
     calls:[
         [{opacity:[0,1],translateY:[100,0]}]
     ]
 });
 $.Velocity.RegisterEffect("scaleIn",{
        defaultDuration:500,
        calls:[
            [{opacity:[1,0],scale:[1,0,2]}]
        ]
    });
    $.Velocity.RegisterEffect("scaleOut",{
        defaultDuration:500,
        calls:[
            [{opacity:[0,1],scale:[0,1]}]
        ]
    })
 var sequence=[
     {elements:container,properties:'slideUpIn',options:{delay:300}},
     {elements:box,properties:'slideUpIn',options:{sequenceQueue:false}},
     {elements:log,properties:'slideUpIn',options:{sequenceQueue:false,delay:60}}
 ];
    $.Velocity.RunSequence(sequence);
var clickList=[
    {elements:container,properties:'slideDownOut'},
    {elements:box,properties:'slideDownOut',options:{sequenceQueue:false}},
    {elements:container,properties:'slideUpIn',options:{}},
    {elements:back,properties:'slideUpIn',options:{sequenceQueue:false}},
    {elements:img,properties:'scaleIn',options:{delay:60,sequenceQueue:false}}

];

var closeList=[
    {elements:container,properties:'slideDownOut'},
    {elements:back,properties:'slideDownOut',options:{sequenceQueue:false}},
    {elements:img,properties:'scaleOut',options:{sequenceQueue:false}},
    {elements:container,properties:'slideUpIn',options:{}},
    {elements:box,properties:'slideUpIn',options:{delay:60,sequenceQueue:false}},
    {elements:log,properties:'slideUpIn',options:{sequenceQueue:false,delay:60}}
    ];

 btn.on('click',function(){
     $.Velocity.RunSequence(clickList);
 });
close.on('click',function(){
    $.Velocity.RunSequence(closeList);
})
})(jQuery)