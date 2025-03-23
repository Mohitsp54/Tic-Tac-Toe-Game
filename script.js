const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner(currentPlayer)) {
      message.textContent = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (boardState.every(cell => cell)) {
      message.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Check for winner
function checkWinner(player) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}

// Disable the board
function disableBoard() {
  cells.forEach(cell => cell.classList.add('taken'));
}

//Restart game
function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Initialize message
message.textContent = `Player ${currentPlayer}'s turn`;
