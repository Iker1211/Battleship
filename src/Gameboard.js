import Ship from "./Ship.js"

export default class Gameboard {

     constructor() {
        this.board = Array(10).fill().map(() => Array(10).fill('empty'));
     }

    placeShip(board, length, timesHit, sunk, y, x, orientation) {

        if (x < 0 || x > 9 || y < 0 || y > 9) {
            return false;
        }

        let newShip = new Ship(1, 0, false, 1, 1, "horizontal");

        if (typeof(newShip.x) ==! "number" || typeof(newShip.y) ==! "number" ) {
            newShip = false;
            return;
        }

        if (orientation === "horizontal") {
            if (y + length -1 > 9) {
                return false;
            }

            for (let i = 0; i < length; i++) {
                if (board[x][y + i] !== "empty") {
                    return false;
                }
            }
        } else if (orientation === "veritcal") {
            if (x + length -1 > 9) {
                return false;
            }

            for(let i = 0; i < length; i++) {
                if (board[x + i][y] !== "empty") {
                    return false;
                }
            }
        } else {
            return false;
        }

        if (orientation == "horizontal") {
            for (let i = 0; i < length; i++) {
                board[x][y + i] = "ship";
            }
        } else {
            for (let i = 0; i < length; i++) {
                board[x + i][y] = "ship";
            }
        }

        return true;
    }

    logBoard() {
        console.log(this.board);
    }
}

let board1 = new Gameboard(10);

// board1.placeShip(1, 0, false, 1, 1, "horizontal");
board1.logBoard();
