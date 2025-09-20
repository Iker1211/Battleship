import Ship from "./Ship.js"

export default class Gameboard {

    constructor(dimensions) {
        this.dimensions = dimensions;
        let board = Array(dimensions).fill().map(() => Array(dimensions).fill('empty'));
    }

    placeShip(length, timesHit, sunk, y, x, orientation) {

        let newShip = new Ship(1, 0, false, 1, 1, "horizontal");

        if (typeof(newShip.x) ==! "number" || typeof(newShip.y) ==! "number" ) {
            newShip = false;
            return;
        }

        console.log("arito")
    }
}

let board1 = new Gameboard(10);

board1.placeShip(1, 0, false, 1, 1, "horizontal");
