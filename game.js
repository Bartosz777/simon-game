var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).one("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
  var currentObj = $("#" + currentColor);
  currentObj.addClass("pressed");
  setTimeout(function () {
    currentObj.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("game-over");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}