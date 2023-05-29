
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userclickedpattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function(){

    var userchosencolour = $(this).attr("id");
    userclickedpattern.push(userchosencolour);

    playsound(userchosencolour);

    animatepress(userchosencolour);

    checkAnswer(userclickedpattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userclickedpattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userclickedpattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextsequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playsound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

    }

}

function nextsequence() {

    userclickedpattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomvariable = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomvariable];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadein(100).fadeout(100).fadein(100);

    playsound(randomChosenColour);
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(currentcolour){
    $("#" + currentcolour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentcolour).removeClass("pressed");
    },100);
}

//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }