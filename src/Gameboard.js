import Ship from "./Ship.js"

export default class Gameboard {
    static #rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    static #columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    static #board = [];

    static createGrid() {
        for (let i = 0; i < this.#rows.length; i++) {
            for (let j = 0; j < this.#columns.length; j++) {

                let cell = {
                    row: Gameboard.#rows[i],
                    column: Gameboard.#columns[j],
                };

                console.log(Gameboard.#rows[i], Gameboard.#columns[j])
                this.#board.push(cell);
            }
        }
    }

    static logBoard() {
        console.log(this.#board);
    }

    static placeShip(length, timesHit, sunk, y, x, orientation) {

        let newShip = new Ship(1, 0, false, 1, 1, "horizontal");

        if (typeof(newShip.x) ==! "number" || typeof(newShip.y) ==! "number" ) {
            newShip = false;
            return;
        }


    }
}

Gameboard.createGrid();
Gameboard.logBoard();