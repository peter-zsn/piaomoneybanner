/**
 * Created by peter on 2017/7/31.
 */
var minSize = 5;//最小尺寸
var maxSize = 50;//最大尺寸
var newOn = 200;//产生雪片的时间
var flakeColor = "#fff";//雪片颜色

var flake = $("<div></div>").css({
    "position": "absolute",
    "top": "-50px"
}).html("<img src='1.jpg' style='width: 100px; height: 50px'>");       //雪片div

//<img src='1.jpg' style='width: 50px'>
var i = 0;
$(function () {
    flake_going();//产生雪花动画
    $(".ig").eq(0).show().siblings().hide();
    ShowBanner();
    tab_hover();
    $(".btn1").click(function () {
        btn1();
    });
    $(".btn2").click(function () {
        btn2();
    });

});


function flake_going() {
    var documentHeight = $(document).height(); //浏览器高度
    var documentWidth = $(document).width();//浏览器宽度
    setInterval(function () {
        var size = minSize + maxSize * Math.random();//雪花大小
        var starLeft = documentWidth * Math.random();    //随机距离左边的距离 Math.random(): 0-1之间的随机数
        var startOpacity = 0.7 + 0.3 * Math.random();//雪花开始透明度
        var endOpacity = 0.3 * Math.random();  //雪花结束透明度
        var endTop = documentHeight - 100;        //雪花下降高度
        var endLeft = documentWidth * Math.random() - 110;//随机距离左边的距离
        if(endLeft < 100){
            endLeft = 100;
        }
        var durationFall = 3000 + Math.random() * 3000;//雪花下降速度
        //clone 复制，  animate动画
        flake.clone().appendTo("body").css({
            "left": starLeft,
            "opacity": startOpacity,
            "font-size": size,
            "color": flakeColor,
            "top": -50
        }).animate({
            "top": endTop,
            "left": endLeft,
            "opacity": endOpacity
        }, durationFall, function () {
            $(this).remove();       //回掉函数， 当雪花到底的时候，移除div
        });//产生雪花
    }, newOn);
};

// 显示指定下标的，其他的不显示
function Show() {
    $(".ig").eq(i).fadeIn(300).siblings().fadeOut(300);
    $(".tab").eq(i).addClass("bg").siblings().removeClass("bg");
}

// 渐变显示图片
function ShowBanner() {
     timer = setInterval(function () {
        i++;
        if(i == 4){
            i = 0;
        }
        Show();
    }, 1000);
}

// tab鼠标响应事件
function tab_hover() {
    $(".tab").hover(function () {
        i = $(this).index();
        Show();
        clearInterval(timer);
    }, function () {
        ShowBanner();
    })
}

function btn1() {
    clearInterval(timer);
    if(i == 0){
        i = 3;
    }else{
        i--;
    }
    Show();
    ShowBanner();
}

function btn2() {
    clearInterval(timer);
    if(i == 3){
        i = 0;
    }else{
        i++;
    }
    Show();
    ShowBanner();
}