//get four buttons as crystals
var startBtn = $("#start-btn");
var box1= $("#box1");
var box2= $("#box2");
var box3= $("#box3");
var box4= $("#box4");
var canvas = document.getElementById("myCanvas");
var targetHeight;
var winDiv = $("#wins");
var loseDiv = $("#losses");
var userNo;
var box1Height;
var box2Height;
var box3Height;
var box4Height;
var boxY = 0;
var winCount= 0;
var lossCount= 0;
var resetBtn = $("#reset-btn")
var ctx = canvas.getContext("2d");
var statusText= "";
// ctx.rect(0, 0, 300, 100);
// ctx.stroke();
var o = 30;


$(".crystal-btn").prop("disabled", true);

function findRandom(x,y){
    return Math.floor(Math.random() * x + y) *10
}


// resetBtn.on("click", function(){
//     ctx.clearRect(0, 0,400,800);
//     startBtn.prop("disabled", false);

// })

startBtn.on("click", function(){
    reset();
    ctx.clearRect(0, 0,400,800);
    targetHeight = findRandom (40,20);
    ctx.fillStyle="#ddd";
    ctx.fillRect(75, o, 250, targetHeight);
    $(".crystal-btn").prop("disabled", false);
    box1Height = findRandom(5,1)
    do{
        box2Height = findRandom(15, 5);
    }while( box1Height==box2Height)
    do{
        box3Height = findRandom(12, 2);
    }while( box1Height==box3Height || box2Height==box3Height)
    do{
        box4Height = findRandom(5, 1);
    }while( box1Height==box4Height || box2Height==box4Height||box3Height==box4Height)
    box1.attr("value", box1Height);
    box2.attr("value", box2Height);
    box3.attr("value", box3Height);
    box4.attr("value", box4Height);

    
  

    TweenMax.fromTo(box1, 1, {height:0, transformOrigin: "50% 0%" },{ height: box1Height, ease:Bounce.easeOut})
    TweenMax.fromTo(box2, 1, {height:0, transformOrigin: "50% 0%"},{ height: box2Height, ease:Bounce.easeOut})
    TweenMax.fromTo(box3, 1, {height:0, transformOrigin: "50% 0%"},{ height: box3Height, ease:Bounce.easeOut})
    TweenMax.fromTo(box4, 1, {height:0, transformOrigin: "50% 0%"},{ height: box4Height, ease:Bounce.easeOut})
    $(".crystal-btn").addClass("visible")

    console.log(box1Height + ' and ' + box2Height + ' and ' + box3Height + ' and ' +box4Height)
    console.log(targetHeight)
    $(this).prop("disabled", true);   
})

$("#box1").on("click" , function(){
    boxY +=  parseInt($(this).val());
    ctx.fillStyle="rgba(75,117,158,0.4)"; 
    ctx.fillRect(75 , o+targetHeight-boxY , 250, $(this).val());
    checkWin();
})
$("#box2").on("click" , function(){
    boxY +=  parseInt($(this).val());
    ctx.fillStyle="rgba(114,193,86,0.4)"; 
    ctx.fillRect(75 , o+targetHeight-boxY , 250, $(this).val());
    checkWin();
})
$("#box3").on("click" , function(){
    boxY +=  parseInt($(this).val());
    ctx.fillStyle="rgba(223,79,55,0.4)"; 
    ctx.fillRect(75 , o+targetHeight-boxY , 250, $(this).val());
    checkWin();
})
$("#box4").on("click" , function(){
    boxY +=  parseInt($(this).val());
    ctx.fillStyle= "rgba(247,181,56,0.4)"; 
    ctx.fillRect(75 , o+targetHeight-boxY , 250, $(this).val());
    checkWin();
})

function checkWin(){
    if (boxY == targetHeight){
        winCount ++;
        winDiv.text(winCount);
        $(".crystal-btn").prop("disabled", true);
        startBtn.prop("disabled", false);
        statusText= "Nice!"
        $("#status-text").text(statusText);
        $("#status-text").attr("class" , "win-text");

    } else if (boxY>targetHeight){
        lossCount ++;
        loseDiv.text(lossCount);
        $(".crystal-btn").prop("disabled", true);
        startBtn.prop("disabled", false);
        statusText= "Close! try again!"
        $("#status-text").text(statusText);
        $("#status-text").attr("class","lose-text");
    }
}

function reset(){
box1Height = ""
box2Height = ""
box3Height = ""
box4Height = ""
boxY = 0;
statusText= "";
$("#status-text").text(statusText);
winDiv.text(winCount);
loseDiv.text(lossCount);

}

