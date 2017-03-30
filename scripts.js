var mode = '';
var series = new Array();
var currentColor = '';
var mistake = false;
var playerTurn = false;

$(document).ready(function(){

	$('.sides').click(function(){
		if(playerTurn) {
			playerMovement($(this).attr('id'));
			setTimeout(function() { generateMovement();},1900);
		}
	});
});

/*
*	Function responsible for starting the game 
*/
function startGame() {
	$('#startButton').hide();
	generateMovement();
}

/*
*	Function responsible for generating the next movement
*/
function generateMovement() {

	setTimeout(printSeries, 1200);

	if(!mistake)
	{
		playerTurn = false;
		var newColor = Math.floor(Math.random() * 3);
		switch(newColor) {
			case 0:
				currentColor = 'yellow';
				$('#yellowSide').addClass('yellowSideGlow');
				setTimeout(function() {$('#yellowSide').removeClass('yellowSideGlow');},1200);
				break;
			case 1:
				currentColor = 'blue';
				$('#blueSide').addClass('blueSideGlow');
				setTimeout(function() {$('#blueSide').removeClass('blueSideGlow');},1200);
				break;
			case 2:
				currentColor = 'red';
				$('#redSide').addClass('redSideGlow');
				setTimeout(function() {$('#redSide').removeClass('redSideGlow');},1200);
				break;
			case 3:
				currentColor = 'green';
				$('#greenSide').addClass('greenSideGlow');
				setTimeout(function() {$('#greenSide').removeClass('greenSideGlow');},1200);
				break;
		}
		series.push(newColor); //add the new color to the list
		playerTurn = true;
	}
}

/*
*	Function responsible for capturing the player movement
*/
function playerMovement(elementID) {
	if(elementID.indexOf(currentColor) !== -1) {
		$('#' + elementID).addClass(elementID + 'Glow');
		setTimeout(function() {$('#' + elementID).removeClass(elementID + 'Glow');},1200);
		return true;
	}
	else {
		//sideError
		$('#' + elementID).addClass('sideError');
		setTimeout(function() {$('#' + elementID).removeClass('sideError');},500);
		mistake = true;
		return false;
	}
}

/*
*	Function responsible for printing all the previous movements before generating
*	the next one.
*/
function printSeries() {
	for(var i = 0; i < series.length; i++) {
		switch(series[i]) {
			case 0:
				$('#yellowSide').addClass('yellowSideGlow');
				setTimeout(function() {$('#yellowSide').removeClass('yellowSideGlow');},1200);
				break;
			case 1:
				$('#blueSide').addClass('blueSideGlow');
				setTimeout(function() {$('#blueSide').removeClass('blueSideGlow');},1200);
				break;
			case 2:
				$('#redSide').addClass('redSideGlow');
				setTimeout(function() {$('#redSide').removeClass('redSideGlow');},1200);
				break;
			case 3:
				$('#greenSide').addClass('greenSideGlow');
				setTimeout(function() {$('#greenSide').removeClass('greenSideGlow');},1200);
				break;
		}
	}
}

/*
*	Function responsible for starting the game in strict mode
*/
function startStrictMode() {
	if($('#strictModeButton').hasClass('strictModeOn')){
		$('#strictModeButton').removeClass();
		mode = 'normal';
	}
	else {
		$('#strictModeButton').addClass('strictModeOn');
		mode = 'strict';
	}
}

/*
*	Function responsible for starting the game
*/
function restartGame() {
	$('#startButton').show();
}