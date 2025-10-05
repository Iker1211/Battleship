import "./reset.css";
import "./styles.css";
import Game from "./Game.js";
import {
  displayGameboards,
  displayShips,
  highlightCollision,
  displayShots,
  drawShots,
} from "./DOMhandler.js";

let url = "./assets/audios/gunshot.mp3";

let audioShot = new Audio(url);

let firstGame = new Game("human", "computer");

function onEnemyCellClick(x, y) {
  firstGame.player2.gameboard.receiveAttack(
    firstGame.player2.gameboard.board,
    x,
    y,
  );
  console.log("party");
  audioShot.play();
}

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  1,
  1,
  1,
  "vertical",
);

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  2,
  4,
  4,
  "horizontal",
);

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  2,
  3,
  8,
  "vertical",
);

firstGame.player2.gameboard.placeShip(
  firstGame.player2.gameboard.board,
  1,
  1,
  1,
  "vertical",
);

displayGameboards(
  firstGame.player1.gameboard.board,
  firstGame.player2.gameboard.board,
);

displayShips(
  firstGame.player1.gameboard.ships,
  firstGame.player2.gameboard.ships,
);

firstGame.player1.gameboard.receiveAttack(firstGame.player1.gameboard, 1, 1);
firstGame.player1.gameboard.receiveAttack(firstGame.player1.gameboard, 4, 4);
firstGame.player1.gameboard.receiveAttack(firstGame.player1.gameboard, 5, 4);

drawShots();

document.querySelectorAll(".enemigo").forEach((cell) => {
  cell.addEventListener("click", (event) => {
    const id = cell.id;
    const [, colChar, rowNum] = id.match(/enemigo-([A-J])(\d+)/);

    const x = "ABCDEFGHIJ".indexOf(colChar) + 1;
    const y = parseInt(rowNum, 10);
    onEnemyCellClick(x, y);
  });

  // displayGameboards( // Por qué está pasando esto aquí?
  //   firstGame.player1.gameboard.board,
  //   firstGame.player2.gameboard.board,
  // );
});

// if (result && result.hasCollision) {
//   highlightCollision(result);
//   console.log("hola");
// }

// Por cada jugador un grid
// La lógica del juego debería estar separada del control del DOM,
// en módulos diferentes?
