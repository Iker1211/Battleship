import "./styles.css";
import Game from "./Game.js";
import DOMhandler from "./DOMhandler.js";
import displayGameboards from "./DOMhandler.js";

let firstGame = new Game("human", "computer");

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  1,
  1,
  1,
  "horizontal",
);

firstGame.player2.gameboard.placeShip(
  firstGame.player2.gameboard.board,
  1,
  1,
  1,
  "horizontal",
);

displayGameboards(
  firstGame.player1.gameboard.board,
  firstGame.player2.gameboard.board,
);

// displayGameboards();

// Por cada jugador un grid
// La lógica del juego debería estar separada del control del DOM,
// en módulos diferentes?
