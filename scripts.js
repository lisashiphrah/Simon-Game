var side = '';
var computerSide = '';
var winner = '';
var gameIsOver = false;

$(document).ready(function(){

	$('.sides').mouseenter(function(){
		$(this).addClass('bounce');
	});

	$('.sides').mouseleave(function(){
		$(this).removeClass('bounce');
	});

});

/**
* Function called after user selects a side to play
* param {value} side selected
*/
function selectedSide(value){
	side = value;
	$('#initGameContainer').hide();
	$('#boardContainer').show();

	initGame();
}

/**
* Function responsible for starting the game
*/
function initGame() {
	if(side !== 'X') { //If user selected O, computer starts playing
		computerSide = 'X';
		computerMovement();
	}
	else {
		computerSide = 'O';
	}
}

/**
* Function called when the user makes his movement
* param {element} element/position clicked
*/
function makeMovement(element){
	if(!gameIsOver){
		if($(element).text() === ''){
			$(element).text(side);
		}
		gameIsOver = checkWinner();
		if(!gameIsOver) { //if there is no winner, computer plays
			setTimeout(function(){ computerMovement(); }, 300);
		}
	}
}

/**
* Computer play
* Here there is a very basic AI implementation
*/
function computerMovement(){
	if(	($('#11').text() === side ||
		$('#21').text() === side ||
		$('#23').text() === side ||
		$('#31').text() === side ||
		$('#33').text() === side)  &&
		$('#22').text() === '') {
		$('#22').text(computerSide);
	}
	else if(($('#11').text() === side || $('#13').text() === side) && $('#12').text() === ''){
		$('#12').text(computerSide);
	}
	else if(($('#31').text() === side || $('#33').text() === side) && $('#32').text() === ''){
		$('#32').text(computerSide);
	}
	else if(($('#31').text() === side || $('#32').text() === side) && $('#33').text() === ''){
		$('#33').text(computerSide);
	}
	else if(($('#21').text() === side || $('#22').text() === side) && $('#23').text() === ''){
		$('#23').text(computerSide);
	}
	else if(($('#12').text() === side|| $('#13').text() === side) && $('#11').text() === ''){
		$('#11').text(computerSide);
	}
	else {
		randomPlay();
	}
	setTimeout(function(){ gameIsOver = checkWinner(); }, 300);
}

/**
* Gets a random free position and play
*/
function randomPlay(){
	var validPlay = false;
	while(!validPlay){
		var random = Math.random() * 10;
		if(random < 1 && $('#11').text() === ''){
			$('#11').text(computerSide);
			validPlay = true;
		}
		else if(random < 2 && $('#12').text() === ''){
			$('#12').text(computerSide);
			validPlay = true;
		}
		else if(random < 3 && $('#13').text() === ''){
			$('#13').text(computerSide);
			validPlay = true;
		}
		else if(random < 4 && $('#21').text() === ''){
			$('#21').text(computerSide);
			validPlay = true;
		}
		else if(random < 5 && $('#22').text() === ''){
			$('#22').text(computerSide);
			validPlay = true;
		}
		else if(random < 6 && $('#23').text() === ''){
			$('#23').text(computerSide);
			validPlay = true;
		}
		else if(random < 7 && $('#31').text() === ''){
			$('#31').text(computerSide);
			validPlay = true;
		}
		else if(random < 8 && $('#32').text() === ''){
			$('#32').text(computerSide);
			validPlay = true;
		}
		else if($('#33').text() === ''){
			$('#33').text(computerSide);
			validPlay = true;
		}
	}
}

/**
* Function called when the button 'Restart Game' is clicked.
* Restarts the game.
*/
function restartGame(){
	winner = '';
	gameIsOver = false;
	$('#boardContainer').hide();
	$('#initGameContainer').show();
	cleanBoard();
}

/**
* Function called to verify if the game is over and if there is a winner
*/
function checkWinner(){
	var pos11 = $('#11').text();
	var pos12 = $('#12').text();
	var pos13 = $('#13').text();
	var pos21 = $('#21').text();
	var pos22 = $('#22').text();
	var pos23 = $('#23').text();
	var pos31 = $('#31').text();
	var pos32 = $('#32').text();
	var pos33 = $('#33').text();

	//Same line
	if(pos11 === pos12 && pos12 === pos13 && pos11 !== '') {
		winner = pos11;
	}

	else if(pos21 === pos22 && pos22 === pos23 && pos21 !== '') {
		winner = pos22;
	}

	else if(pos31 === pos32 && pos32 === pos33 && pos31 !== '') {
		winner = pos31;
	}

	//Same column
	else if(pos11 === pos21 && pos21 === pos31 && pos11 !== '') {
		winner = pos11;
	}

	else if(pos12 === pos22 && pos22 === pos32 && pos12 !== '') {
		winner = pos22;
	}

	else if(pos13 === pos23 && pos23 === pos33 && pos13 !== '') {
		winner = pos13;
	}

	//Diagonal
	else if(pos11 === pos22 && pos22 === pos33 && pos11 !== '') {
		winner = pos22;
	}

	else if(pos13 === pos22 && pos22 === pos31 && pos13 !== '') {
		winner = pos22;
	}
	else {
		if(pos11 !== '' && pos12 !== '' && pos13 !== '' && pos21 !== '' && pos22 !== '' &&
			pos23 !== '' && pos31 !== '' && pos32 !== '' && pos33 !== ''){
				winner = 'DRAW';
		}
	}

	if(winner !== ''){
		if(winner === 'DRAW') {
			setTimeout(function(){ alert('DRAW'); }, 100);
		}
		else {
			setTimeout(function(){ alert('winner: ' + winner); }, 100);
		}
		switch(winner){
			case 'X':
				var scoreX = parseInt($('#xScore').text(), 10)  + 1;
				$('#xScore').text('' + scoreX);
				break;
			case 'O':
				var scoreO = parseInt($('#oScore').text(), 10)  + 1;
				$('#oScore').text('' + scoreO);
				break;
			case 'DRAW':
				var scoreXDraw = parseInt($('#xScore').text(), 10) + 1;
				$('#xScore').text('' + scoreXDraw);
				var scoreODraw = parseInt($('#oScore').text(), 10)  + 1;
				$('#oScore').text('' + scoreODraw);
				break;
		}
		return true;
	}
	return false;
}

/**
* Cleans the board for the next game
*/
function cleanBoard() {
	var pos11 = $('#11').text('');
	var pos12 = $('#12').text('');
	var pos13 = $('#13').text('');
	var pos21 = $('#21').text('');
	var pos22 = $('#22').text('');
	var pos23 = $('#23').text('');
	var pos31 = $('#31').text('');
	var pos32 = $('#32').text('');
	var pos33 = $('#33').text('');
}
