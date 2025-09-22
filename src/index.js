import "./styles.css";
import Game from "./Game.js"

let firstGame = new Game("human", "computer");

firstGame.player1.gameboard.placeShip(firstGame.player1.gameboard.board, 1, 1, 1, "horizontal");
firstGame.player2.gameboard.placeShip(firstGame.player2.gameboard.board, 1, 1, 1, "horizontal");

const app = document.getElementById("app");

function displayGameboards() {
    let board1 = firstGame.player1.gameboard.board;

    for (let i = 0; i < board1.length; i++) {
        board1[i].forEach(element => {
            let cell = document.createElement("div");
            cell.innerHTML = "cell";
            app.appendChild(cell);
        });
    }
} 

displayGameboards();