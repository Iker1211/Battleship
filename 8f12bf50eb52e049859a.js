import "./reset.css";
import "./styles.css";
import Game from "./Game.js";
import { randomizeShips } from "./Gameboard.js";
import { displayGameboards, displayShips, drawShots } from "./DOMhandler.js";

const url = "./assets/audios/gunshot.mp3";
const audioShot = new Audio(url);

const firstGame = new Game("human", "computer");
let currentTurn = "player"; // "player" or "computer"

randomizeShips(firstGame.player1.gameboard);
randomizeShips(firstGame.player2.gameboard);

// --- Main render function ---
function renderAll() {
  displayGameboards(
    firstGame.player1.gameboard.board,
    firstGame.player2.gameboard.board,
  );
  displayShips(
    firstGame.player1.gameboard.ships,
    firstGame.player2.gameboard.ships,
  );
  drawShots(firstGame.player2.gameboard, "enemigo"); // Player shots
  drawShots(firstGame.player1.gameboard, "amigo"); // Computer shots
  attachEnemyCellListeners();
}

// --- Attach click listeners to enemy cells ---
function attachEnemyCellListeners() {
  document.querySelectorAll(".enemigo").forEach((cell) => {
    cell.onclick = null; // Remove previous listeners
    cell.addEventListener("click", (event) => {
      if (currentTurn !== "player") return; // Only if it's player's turn
      const id = cell.id;
      const [, colChar, rowNum] = id.match(/enemigo-([A-J])(\d+)/);
      const x = "ABCDEFGHIJ".indexOf(colChar) + 1;
      const y = parseInt(rowNum, 10);
      playerTurn(x, y);
    });
  });
}

function checkGameOver() {
  if (firstGame.player1.gameboard.lostGame) {
    alert("¡La computadora gana!");
    currentTurn = null;
    return true;
  }
  if (firstGame.player2.gameboard.lostGame) {
    alert("¡El jugador gana!");
    currentTurn = null;
    return true;
  }
  return false;
}

// --- Player's turn logic ---
function playerTurn(x, y) {
  firstGame.player2.gameboard.receiveAttack(
    firstGame.player2.gameboard.board,
    x,
    y,
  );

  console.log(firstGame.player2.gameboard.checkLoss());
  console.log(firstGame.player2.gameboard.lostGame);

  audioShot.play();
  renderAll();

  if (checkGameOver()) return;

  currentTurn = "computer";
  setTimeout(computerTurn, 700); // Computer shoots after delay
}

// --- Computer's turn logic ---
function computerTurn() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 10) + 1;
    y = Math.floor(Math.random() * 10) + 1;
  } while (
    firstGame.player1.gameboard.shots &&
    firstGame.player1.gameboard.shots.some(
      (shot) => shot.col === x && shot.row === y,
    )
  );
  firstGame.player1.gameboard.receiveAttack(
    firstGame.player1.gameboard.board,
    x,
    y,
  );

  audioShot.play();
  renderAll();

  if (checkGameOver()) return;

  currentTurn = "player";
}

// --- Initial render ---
renderAll();
