let buttonColors = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let level = 0;

let started = false;


//Game Over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


//This adds a new color by the pc
function nextSequence() {
  let randomNum = Math.floor((Math.random() * 4));
  let randomChosenColor = buttonColors[randomNum];

  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //Change level
  level++;
  $("#level-title").text("Level " + level);
}

//This adds a new color by the player
$(".btn").click(function(event) {
  let userChosenColor = (event.target.id);

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
})

//Create Audio
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation for clicks
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//---GAME STARTS---//

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong");
    playSound("wrong")
    $("#level-title").html("Game Over<br><br>Press a key to restart");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}
