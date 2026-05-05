const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// 🔥 NEW: Scores
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (checkWin()) {
    statusText.innerText = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;

    // 🔥 UPDATE SCORE
    if (currentPlayer === "X") {
      scoreX++;
      document.getElementById("scoreX").innerText = scoreX;
    } else {
      scoreO++;
      document.getElementById("scoreO").innerText = scoreO;
    }

    updateRank(); // 🔥 update rank
    return;
  }

  if (!board.includes("")) {
    statusText.innerText = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer} Turn`;
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.innerText = "Player X Turn";

  cells.forEach(cell => cell.innerText = "");
}

// 🔥 RANK SYSTEM
function updateRank() {
  const totalWins = scoreX + scoreO;
  let rank = "Beginner";

  if (totalWins >= 3) rank = "Intermediate";
  if (totalWins >= 6) rank = "Advanced";
  if (totalWins >= 10) rank = "Pro";

  document.getElementById("rank").innerText = rank;
}