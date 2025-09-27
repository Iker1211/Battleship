import "./reset.css";
import "./styles.css";
import Game from "./Game.js";
import {
  displayGameboards,
  displayShips,
  highlightCollision,
} from "./DOMhandler.js";

let firstGame = new Game("human", "computer");

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

const result = firstGame.player1.gameboard.placeShip(
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

if (result && result.hasCollision) {
  highlightCollision(result);
  console.log("hola");
}

// Por cada jugador un grid
// La lógica del juego debería estar separada del control del DOM,
// en módulos diferentes?
