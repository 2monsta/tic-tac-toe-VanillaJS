// user should be to click on a button, when that happens, the square should have that play mark (x or O);
// if it's x turn, put the x in. if its' 0's turn then put an O in it
// means we need to keep track of who's turn it is
// when x goes, it becomes o's turn, when 0 goes, it becomes x turns
// check to see if someone won the game, if so, congratulate them, otherwise do nothing
//hightlight the winning combo
// game must stop if someone (cant keep clicking on them);

// squares is an array with 9 objects each object, is theJS representation of the HTML tag
// init whosTurn as player 1s turn
var squares = document.getElementsByClassName("square")
var whosTurn = 1;
var player1Squares = [];
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
var gameStart = false;
var getName = document.getElementById("submitName");
getName.addEventListener("click", function(event){
	document.getElementById("player-name").innerHTML = document.getElementById("player-info").value;
});



function markSquare(squareClick){
	// console.log(squareClick.innerHTML);
	if(squareClick.innerHTML !== "-"){
		document.getElementById("message").innerHTML=("Sorry, this square is taken!")
	}else if(whosTurn ==1){
		squareClick.innerHTML = "X";
		whosTurn =2;
		player1Squares.push(squareClick.id);
		document.getElementById("message").innerHTML= "";
		checkWin(player1Squares, 1);
	}else{
		squareClick.innerHTML = "O";
		whosTurn =1;
		player2Squares.push(squareClick.id);
		document.getElementById("message").innerHTML= "";
		checkWin(player2Squares, 2);
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
	}
}
function endGame(winningCombo, whoJustMarked){
	//winner winner chicken dinner!
	console.log(`Player ${whoJustMarked} won the game`);
	document.getElementById("message").innerHTML = `Congratz to ${whoJustMarked}!`
	gameOver = true;
	// anther thing we can do is loop through winning combo, and a class
	for(let i =0; i < winningCombo.length; i++){
		// add another class to the winning squares
		document.getElementById(winningCombo[i]).className += " winning-square";
	}

	reset(winningCombo);
}


function reset(winningCombo){
	gameOver = false;
	var x = document.getElementById("reset");
	x.addEventListener("click", function(event){
		for(let i =0; i < winningCombo.length; i++){
			// add another class to the winning squares
			document.getElementById(winningCombo[i]).className = "square";
		}
		player1Squares = [];
		player2Squares = [];
		for(let i = 0; i<squares.length; i++){
			squares[i].innerHTML = "-";
		}
	});
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
	


