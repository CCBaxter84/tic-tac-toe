// Cache the dom
const squares = document.getElementsByClassName('square');
const topLeft = document.getElementById('top-left');
const topMid = document.getElementById('top-mid');
const topRight = document.getElementById('top-right');
const midLeft = document.getElementById('mid-left');
const midMid = document.getElementById('mid-mid');
const midRight = document.getElementById('mid-right');
const btmLeft = document.getElementById('btm-left');
const btmMid = document.getElementById('btm-mid');
const btmRight = document.getElementById('btm-right');
const resetBtn = document.getElementById('reset-btn');
const winMessage = document.getElementById('win-message');

// State vars
let won = false;
let turn = 'X';
const wins = [
  [topLeft, topMid, topRight],
  [midLeft, midMid, midRight],
  [btmLeft, btmMid, btmRight],
  [topLeft, midLeft, btmLeft],
  [topMid, midMid, btmMid],
  [topRight, midRight, btmRight],
  [topLeft, midMid, btmRight],
  [btmLeft, midMid, topRight]
];

// Event handlers
function handleClick(event) {
  event.target.innerHTML = turn;
  turn === 'X' ? turn = 'O' : turn = 'X';
  event.target.removeEventListener('click', handleClick);
  wins.forEach(path => {
    if (path.every(square => square && square.innerHTML === 'X')) {
      console.log('Player 1 wins');
      won = true;
      winMessage.innerHTML = 'Player 1 Wins!!';
      return;
    } else if (path.every(square => square && square.innerHTML === 'O')) {
      console.log('Player 2 wins');
      won = true;
      winMessage.innerHTML = 'Player 2 Wins!!';
      return;
    }
  });
  if (won) {
    endGame();
  }
}

function endGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener('click', handleClick);
  }
}

function handleReset() {
  won = false;
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '&nbsp;&nbsp;';
  }
  turn = 'X';
  setBoard();
}

function setBoard() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', handleClick);
  }
  winMessage.innerHTML = '';
}

setBoard();
resetBtn.addEventListener('click', handleReset);

