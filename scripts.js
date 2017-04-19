
/**
 * Global variables
 */
 var machinePlay = [];
var userPlay = [];
var z = -1;
var w = -1;
var rand = 1;
var count = 0;
var counter = 0;
var userCount = 0;
var n = 0;

/**
 * Sounds files
 */
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');


/**
 * Function called when user pressed the START button
 */
function startGame() {
	cleansCounters();
	$('#startButton').hide();
	$('#score').val('1');
	machineMovement();
}

/**
 * Function called when user pressed the RESTART button
 */
function restartGame(){
	$('#startButton').show();
	$('#score').val('0');
}

// Reset function for all buttons:
function turnOffLights() {
	$("#green").removeClass("greenGlow");
	$("#red").removeClass("redGlow");
	$("#yellow").removeClass("yellowGlow");
	$("#blue").removeClass("blueGlow");			
}

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

/**
 * Function called when AI makes a movement
 */
function machineMovement() {
	var x = 1;
	function clear() {
		clearInterval(machineMovement);
	}

	if (count > 0) {
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

}

/**
 * Generate a random number between 1 and 4 for each round:
 */
function generateRandomPlay() {
	rand = Math.floor((Math.random() * 4) + 1);
	machinePlay.push(rand);
	return rand;
}

/**
 * Function called when user makes a movement
 */
function userMovement() {

	if(!hasAWinner()){
		// User correctly completed the game
		if (userPlay.length === machinePlay.length && userPlay[userCount] === machinePlay[userCount]) {
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
		else if (userPlay[userCount] === machinePlay[userCount] ) {
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


/**
 * Prints the sequence generated until the moment
 */
function printSequence() {

	if (machinePlay[n] === 1 ) {
		greenLight();
		n++;
	}
	else if (machinePlay[n] === 2) {
		redLight();
		n++;
	}
	else if (machinePlay[n] === 3) {
		yellowLight();
		n++;
	}
	else if (machinePlay[n] === 4) {
		blueLight();
		n++;
	}	
}

/**
 * Check if the computer has iterated to the current round:
 */
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

/**
 * Check function for when the user fails a round (normal mode):
 */
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

/**
 * Adds classes and styles to the game when user loses
 */
function losesGame() {
	$("#green").addClass("greenLoser");
	$("#red").addClass("redLoser");
	$("#yellow").addClass("yellowLoser");
	$("#blue").addClass("blueLoser");
}

/**
 * Cleans classes added when user lost the game
 */
function cleanLostGame() {
	$("#green").removeClass("greenLoser");
	$("#red").removeClass("redLoser");
	$("#yellow").removeClass("yellowLoser");
	$("#blue").removeClass("blueLoser");

	increaseScore();	
}

/**
 * Function responsible for verifying if there's a winner
 * @return true if there is a winner
 */
function hasAWinner() {
	if (userPlay[userCount] === machinePlay[userCount] 
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

/**
 * Cleans global variables and counter
 */
function cleansCounters() {
	n = 0;
	machinePlay = [];
	userPlay = [];
	count = 0;
	counter = 0;
	userCount = 0;
}

/**
 * Function responsible for increasing the score
 */
function increaseScore() {
	var score = parseInt($('#score').val(), 10) + 1;
	$('#score').val(score);	
}

//////////////////// YELLOW BUTTON EVENTS //////////////////////
/**
 * Function when Yellow button is pressed
 */
function yellowClick() {
	yellowLight();
	userPlay.push(3);
	userMovement();	
}
/**
 * Turns on yellow lights and play sound
 */
function yellowLight() {
	turnOffLights()	
	$('#yellow').toggleClass("yellowGlow");
	yellowAudio.play();
}


//////////////////// BLUE BUTTON EVENTS //////////////////////

/**
 * Function when Blue button is pressed
 */
function blueClick() {
	blueLight();
	userPlay.push(4);
	userMovement();	
}
/**
 * Turns on blue lights and play sound
 */
function blueLight() {
	turnOffLights()
	$('#blue').toggleClass("blueGlow");
	blueAudio.play();
}

//////////////////// RED BUTTON EVENTS //////////////////////

/**
 * Function when Red button is pressed
 */
function redClick() {
	redLight();
	userPlay.push(2);
	userMovement();	
}
/**
 * Turns on red lights and play sound
 */
function redLight() {
	turnOffLights()
	$('#red').toggleClass("redGlow");
	redAudio.play();
}


//////////////////// GREEN BUTTON EVENTS //////////////////////
/**
 * Function when Green button is pressed
 */
function greenClick(){
	greenLight();
	userPlay.push(1);
	userMovement();
}
/**
 * Turns on green lights and play sound
 */
function greenLight() {
	turnOffLights();
	$('#green').toggleClass("greenGlow");
	greenAudio.play();
}
