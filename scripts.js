var machinePlay = [];
var userPlay = [];
var rand = 1;
var count = 0;
var counter = 0;
var userCount = 0;
var n = 0;

var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

function yellowClick() {
	yellowLight();
	userPlay.push(3);
	userMovement();	
}

function blueClick() {
	blueLight();
	userPlay.push(4);
	userMovement();	
}

function redClick() {
	redLight();
	userPlay.push(2);
	userMovement();	
}

function greenClick(){
	greenLight();
	userPlay.push(1);
	userMovement();
}

// Functions for each button:
function greenLight() {
	turnOffLights();
	$('#green').toggleClass("greenGlow");
	greenAudio.play();
}
function redLight() {
	turnOffLights()
	$('#red').toggleClass("redGlow");
	redAudio.play();
}
function yellowLight() {
	turnOffLights()	
	$('#yellow').toggleClass("yellowGlow");
	yellowAudio.play();
}
function blueLight() {
	turnOffLights()
	$('#blue').toggleClass("blueGlow");
	blueAudio.play();
}

// Reset function for all buttons:
function turnOffLights() {
	$("#green").removeClass("greenGlow");
	$("#red").removeClass("redGlow");
	$("#yellow").removeClass("yellowGlow");
	$("#blue").removeClass("blueGlow");			
}

// Game start function:
function startGame() {
	cleansCounters();
	$('#startButton').hide();
	$('#score').val('1');
	machineMovement();
}


function restartGame(){
	$('#startButton').show();
	$('#score').val('0');
}

var z = -1;
var w = -1;

// Input switches control On/Off State and Strict Mode:
$('#switchRight').change(function(){
	z *= -1;
});

$('#switchLeft').change(function(){

	w *= -1;

	if ( w > 0 ) {
		$("#startButton").css("color", "black");
	}

	if ( w < 0 ) {

		n = 0;
		machinePlay = [];
		userPlay = [];
		count = 0;
		counter = 0;
		userCount = 0;
		turnOffLights();
		$('#score').val('0');	

		$("#startButton").css("color", "rgb(200,200,200");

		$("#green").removeClass("greenLoser");
		$("#red").removeClass("redLoser");
		$("#yellow").removeClass("yellowLoser");
		$("#blue").removeClass("blueLoser");

		$("#green").removeClass("greenWinner");
		$("#red").removeClass("redWinner");
		$("#yellow").removeClass("yellowWinner");
		$("#blue").removeClass("blueWinner");

	}

});

// Computer plays function:
function machineMovement() {
	var x = 1;
	function clear() {
		clearInterval(machineMovement);
	}

	if ( count > 0 ) {
		x = 0;
	}

	var machineMovement = setInterval(function() {

			turnOffLights();
			generateRandomPlay();
			
			if (rand === 1) {
				greenLight();
			}
			else if (rand === 2) {
				redLight();
			}
			else if (rand === 3) {
				yellowLight();	
			}
			else if (rand === 4) {
				blueLight();		
			}

			count++;

			// Resets buttons after machine plays final round, so the user can continue:
			if (count === counter + 1) {
				clear();
				setTimeout(function() {
					turnOffLights();
				}, 500);
			}

	}, 750 * x); // Pause between iterations of button press functions

};

// Generate a random number between 1 and 4 for each round:
function generateRandomPlay() {
	rand = Math.floor((Math.random() * 4) + 1);
	machinePlay.push(rand);
	return rand;
}

// Parse user input:
function userMovement() {

	// Game ends function:
	if(!hasAWinner()){
		// User correctly completed a round:
		if ( userPlay.length === machinePlay.length 
			&& userPlay[userCount] === machinePlay[userCount] ) {
			userPlay = [];
			userCount = 0;

			setTimeout(function() {
				counter++;
				increaseScore();
				turnOffLights();
				check();
			}, 500);
		}

		// User correctly identifies next element in series:
		else if ( userPlay[userCount] === machinePlay[userCount] ) {
			userCount++;
			setTimeout(function() {
				turnOffLights();
			}, 500);
		}

		else if ( z > 0 ) {
			machinePlay = [];
			userPlay = [];
			count = 0;
			counter = 0;
			n = 0;

			losesGame();

			// This is the restart function for strict mode:
			setTimeout(function() {
				cleanLostGame();
				machineMovement();
			}, 1750);
		}

		else {
			n = 0;
			losesGame();
			setTimeout(function() {
				cleanLostGame();
				checkRepeat();

			}, 750);

		}
	}
}

// Repeat function for subsequent game rounds:
function printSequence() {

	if ( machinePlay[n] === 1 ) {
		greenLight();
		n++;
	}
	else if ( machinePlay[n] === 2) {
		redLight();
		n++;
	}
	else if ( machinePlay[n] === 3) {
		yellowLight();
		n++;
	}
	else if (machinePlay[n] === 4) {
		blueLight();
		n++;
	}	

}

// Check if the computer has iterated to the current round:
function check() {

	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {

		turnOffLights();

		if ( n !== machinePlay.length ) {
			printSequence();
		}
		else if ( n === machinePlay.length ) {
			userPlay = [];
			userCount = 0;
			n = 0;
			clear();
			machineMovement();
		}

	}, 750);

}

// Check function for when the user fails a round (normal mode):
function checkRepeat() {

	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {
		turnOffLights();

		if ( n !== machinePlay.length ) {
			printSequence();
		}
		else if ( n === machinePlay.length ) {

			userPlay = [];
			userCount = 0;
			n = 0;
			clear();

		}

	}, 750);

}

function losesGame() {
	$("#green").addClass("greenLoser");
	$("#red").addClass("redLoser");
	$("#yellow").addClass("yellowLoser");
	$("#blue").addClass("blueLoser");
}

function cleanLostGame() {
	$("#green").removeClass("greenLoser");
	$("#red").removeClass("redLoser");
	$("#yellow").removeClass("yellowLoser");
	$("#blue").removeClass("blueLoser");

	increaseScore();	
}

function hasAWinner() {
	if ( userPlay[userCount] === machinePlay[userCount] 
		&& machinePlay.length === 20 
		&& userPlay.length === machinePlay.length) {

		$("#green").addClass("greenWinner");
		$("#red").addClass("redWinner");
		$("#yellow").addClass("yellowWinner");
		$("#blue").addClass("blueWinner");

		$('#score').val('1');

		return true;
	}
	return false;
}

function cleansCounters() {
	n = 0;
	machinePlay = [];
	userPlay = [];
	count = 0;
	counter = 0;
	userCount = 0;
}

function increaseScore() {
	var score = parseInt($('#score').val()) + 1;
	$('#score').val(score);	
}
