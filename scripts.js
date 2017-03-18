var mode = '';
var series = new Array();
var colors = ['yellow', 'blue', 'red', 'green'];

$(document).ready(function(){

});

/*
*	Function responsible for starting the game 
*/
function startGame() {
	$('#startButton').hide();

	generateMovement();
}

function generateMovement() {
	var newColor = Math.floor(Math.random() * 3);
	alert(newColor);
	switch(newColor) {
		case 0:
			setInterval(function() {$('#yellowSide').addClass('yellowSideGlow');},1000);
			setInterval(function() {$('#yellowSide').removeClass('yellowSideGlow');},1000);
			break;
		case 1:
			setInterval(function() {$('#blueSide').addClass('blueSideGlow');},1000);
			setInterval(function() {$('#blueSide').removeClass('blueSideGlow');},1000);
			break;
		case 2:
			setInterval(function() {$('#redSide').addClass('redSideGlow');},1000);
			setInterval(function() {$('#redSide').removeClass('redSideGlow');},1000);
			break;
		case 3:
			setInterval(function() {$('#greenSide').addClass('greenSideGlow');},1000);
			setInterval(function() {$('#greenSide').removeClass('greenSideGlow');},1000);
			break;
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