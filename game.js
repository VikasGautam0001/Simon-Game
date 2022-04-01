var buttonColors = ["green" , "red" , "yellow" , "blue" ];
var gamePattern = [];

var userClickedPattern = [];

var lvl = 0;

var started = false;

$(document).keypress(function (){
	if(!started){
		nextSequence();
		started = true;
	}
} )

$(".btn").click(function (){
	var clickedButton = $(this).attr("id");

	userClickedPattern.push(clickedButton);

	animation("#"+clickedButton);
	makeSound(clickedButton);
	// alert("Clicked button is "+clickedButton);

	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(curLevel){
	if(userClickedPattern[curLevel] === gamePattern[curLevel]){

		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function(){
				nextSequence();
			} , 1000);
		}
	}
	else{
		makeSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		} , 200);
		$("h1").text("Game Over , Press any key to start");
		started = false;
		lvl = 0;
		gamePattern = [];
	}
}


function nextSequence(){

	userClickedPattern = [];

	lvl++;
	$("h1").text("Level "+lvl);


	let rand = Math.floor(Math.random()*4);

	gamePattern.push(buttonColors[rand]);

	let colorId = "#"+buttonColors[rand];

	// $(colorId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	animation(colorId);
	makeSound(buttonColors[rand]);

	
}

function animation(event){
	$(event).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	$(event).addClass("pressed");
	setTimeout(function (){
		$(event).removeClass("pressed");
	} , 100);
}

function makeSound(color){
	let nameOfAudio = "sounds/"+color+".mp3";
	let audio = new Audio(nameOfAudio);
	audio.play();
}