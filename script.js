// user should be to click on a button, when that happens, the square should have that play mark (x or O);
// if it's x turn, put the x in. if its' 0's turn then put an O in it
// means we need to keep track of who's turn it is
// when x goes, it becomes o's turn, when 0 goes, it becomes x turns
// check to see if someone won the game, if so, congratulate them, otherwise do nothing
//hightlight the winning combo
// game must stop if someone (cant keep clicking on them);

// squares is an array with 9 objects each object, is theJS representation of the HTML tag
// init whosTurn as player 1s turn
// var squares = document.getElementsByClassName("square");
var squares = $(".square")
console.log(squares);
var whosTurn = 1;
var player1Squares /* = user */ = [];
var player2Squares = [];
var winningCombos = [
	["A1", "B1", "C1"], /* row1 */
	["A2", "B2", "C2"], /* row2 */
	["A3", "B3", "C3"], /* row3 */
	["A1", "A2", "A3"], /* col1 */
	["B1", "B2", "B3"], /* col2 */
	["C1", "C2", "C3"], /* col3 */
	["A1", "B2", "C3"], /* diag1 */
	["C1", "B2", "A3"], /* diag2 */
]
var gameOver = false;
var display = false;
var p1Score = 0;
var p2Score = 0;
// var numberOfPlayer = Number(prompt("Welcome to Tic-Tac-Toe\nEnter number of players (1 or 2)"));
var numberOfPlayer = 2;
// var playerOne = prompt("Enter your name");
var playerOne = "hi"
// var playerTwo = "Computer";
var playerTwo = "computer"
var time = 10;
var timeUp = false;
// if(numberOfPlayer == 1){
// 	// var getName = document.getElementById("submitName");
// 	$("#player-name").html(playerOne +": ");
// 	playerTwo;
// }
// if(numberOfPlayer == 2){
// 	playerTwo = prompt("Enter 2nd Player name");
// 	$("#player-name").html(playerOne +": ");
// 	$("#computer").html(playerTwo +": ");
// }






function markSquare(squareClick){
	if(timeUp){

	}else{
			// console.log(squareClick.innerHTML);
		// if(squareClick.innerHTML !== "-"){
		// 	$("#message").html("Sorry, this square is taken!");
		if($(squareClick).html() !== "-"){
			$("#message").html("Sorry, this square is taken!");
		}else if(whosTurn ==1){
			// squareClick.innerHTML = "X";
			$(squareClick).html("X");
			whosTurn =2;
			player1Squares.push(squareClick.id);
			$("#message").html("");
			checkWin(player1Squares, 1);
			if(numberOfPlayer == 1 && !gameOver){
				computerMove();
			}
		}else{
			// squareClick.innerHTML = "O";
			$(squareClick).html("O");
			whosTurn =1;
			player2Squares.push(squareClick.id);
			// computerTurn();
			$("#message").html("");
			checkWin(player2Squares, 2);
		}
	}
}
function checkWin(currentPlayer, whoJustMarked){
	// outter loop - check each winning combination
	
	for(let i = 0; i < winningCombos.length; i++){
		// inner loop - check a square inside winning combos
		var squareCount = 0; /* keep track of how many THIS winning combo the palyer has */
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentPlayer.indexOf(winningSquare) !== -1){
				// the square belongs to the player
				squareCount++;
			}
		}
		//end of j loop;
		//check to see if the square count === 3;
		if(squareCount ==3){
			endGame(winningCombos[i], whoJustMarked);
			break;
		}
		var a = player1Squares.length;
		var b = player2Squares.length;
		var y = a + b;
		if(y == 9 && squareCount !==3 ){
			$("#message").html("It's a tie!");
		}
	}
	// var a = player1Squares.length;
	// var b = player2Squares.length;
	// var y = a + b;
	// if(y == 9 ){
	// 	document.getElementById("message").innerHTML = "It's a tie!"
	// 	reset();
	// }
}
function endGame(winningCombo, whoJustMarked){
	//winner winner chicken dinner!
	console.log(`Player ${whoJustMarked} won the game`);
	if(whoJustMarked ==1){
		p1Score +=1;
		$("#message").html(`Congratz to ${playerOne}!`);
		$("#player-one-score").html(p1Score);
	}else if(whoJustMarked == 2){
		p2Score +=1;
		$("#message").html(`Congratz to ${playerTwo}!`);
		$("#player-two-score").html(p2Score);
	}
	gameOver = true;
	display = true;
	// anther thing we can do is loop through winning combo, and a class
	for(let i =0; i < winningCombo.length; i++){
		// add another class to the winning squares
		// document.getElementById(winningCombo[i]).className += " winning-square";
		$(`#${winningCombo[i]}`).addClass("winning-square");
	}
}


function reset(){
	// var x = document.getElementById("reset");
	// x.addEventListener("click", function(event){
	// 	gameOver = false;
	// 	document.getElementById("message").innerHTML = "";
	// 	player1Squares = [];
	// 	player2Squares = [];
	// 	for(let i = 0; i<squares.length; i++){
	// 		squares[i].innerHTML = "-";
	// 		squares[i].className = "square";
	// 	}
	// });

	gameOver = false;
	$("#message").html("");
	timeUp = false;
	countDownTimer();
	player1Squares = [];
	player2Squares = [];
	for(let i = 0; i<squares.length; i++){
		squares[i].innerHTML = "-";
		squares[i].className = "square";
	}
	time = 10;
}

$("#reset").click((event)=>{
	reset();
});
function computerMove(){
	var squareFound = false;
	while(!squareFound){
		rand = Math.floor(Math.random()* 9);
		var isTaken = squares[rand].innerHTML;
		if(isTaken ==="-"){
			squareFound = true;
		}
	}
	markSquare(squares[rand])
}
// function countDown(){
// 	if(time < 0){
// 		$("#message").html("Times Up! You lose!");
// 		timeUp = true;
// 	}else{
// 		var count = time--;
// 		$("#message").html(count);
// 	}
// }
function countDownTimer(){
	setInterval(function(){
		if(display == false && !gameOver){
			if(time < 0){
				$("#message").html("Times Up! You lose!");
				timeUp = true;
				time = 0;
			}else{
				var count = time--;
				$("#message").html(count);
			}
		}
	}, 1000);
}

// two things happen when someone clicls
	//we change the DOM(for theuser)
	//we change the vars for JS
for(let i = 0; i<squares.length; i++){
	// console.log(squares[i]); now thta we have each square indiviually, we will add a click listenr to it
	squares[i].addEventListener("click", function(event){
	// console.log(this);
	// call the marksqure function and pass the square they clicked on
	// only call marksquare if gameOver == false;
		if(!gameOver){ 
			markSquare(this);
		}
	});
}
countDownTimer();




