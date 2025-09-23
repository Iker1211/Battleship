import "./styles.css";
import Game from "./Game.js";
import { displayGameboards, displayShips } from "./DOMhandler.js";

let firstGame = new Game("human", "computer");

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  1,
  1,
  1,
  "horizontal",
);

firstGame.player1.gameboard.placeShip(
  firstGame.player1.gameboard.board,
  4,
  5,
  5,
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

displayShips(
  firstGame.player1.gameboard.ships,
  firstGame.player2.gameboard.ships,    
);

// Por cada jugador un grid
// La lógica del juego debería estar separada del control del DOM,
// en módulos diferentes?
