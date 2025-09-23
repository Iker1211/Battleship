import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill("empty"));
    this.ships = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.missedAttacks = [];
    this.lostGame = false;
  }

  logBoard() {
    console.log(this.board);
  }

  placeShip(board, length, y, x, orientation) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }

    let newShip = new Ship(length, y, x, orientation);

    if (typeof newShip.x == !"number" || typeof newShip.y == !"number") {
      newShip = false;
      return;
    }

    if (orientation === "horizontal") {
      if (y + length - 1 > 9) {
        return false;
      }

      for (let i = 0; i < length; i++) {
        if (board[x][y + i] !== "empty") {
          return false;
        }
      }
    } else if (orientation === "veritcal") {
      if (x + length - 1 > 9) {
        return false;
      }

      for (let i = 0; i < length; i++) {
        if (board[x + i][y] !== "empty") {
          return false;
        }
      }
    } else {
      return false;
    }

    if (orientation == "horizontal") {
      for (let i = 0; i < length; i++) {
        newShip.coordinates.push([x, y + i]);
        board[x][y + i] = "ship";
      }
    } else {
      for (let i = 0; i < length; i++) {
        newShip.coordinates.push([x + i, y]);
        board[x + i][y] = "ship";
      }
    }

    console.log("estas son las coordenadas", newShip.coordinates);

    for (let i = 0; i < this.ships.length; i++) {
      if (typeof this.ships[i] === "number") {
        this.ships[i] = newShip;
        break;
      } else {
        console.log("este lugar ya está ocupado");
      }
    }

    // console.log("this is", this.ships);

    return true;
  }

  receiveAttack(board, x, y) {
    let hitpoint = [x, y];

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }

    this.ships.forEach((ship) => {
      if (typeof ship === "number") return;

      let shipArea = ship.coordinates;

      let atacked = shipArea.find(
        (item) => item[0] === hitpoint[0] && item[1] === hitpoint[1],
      );

      if (atacked) {
        console.log("coño eso dolió");
        ship.hit();
        ship.isSunk();
        // console.log("veces que ha sido golpeado", ship.timesHit);
      } else if (!atacked) {
        this.missedAttacks.push(hitpoint);
        // console.log(this.missedAttacks);
      }
    });
  }

  checkLoss() {
    let positionedShips = this.ships.filter((ship) => typeof ship !== "number");

    let sunkShips = [];

    this.ships.forEach((ship) => {
      if (typeof ship === "number") return;

      let sunk = ship.sunk;

      if (sunk) {
        sunkShips.push(sunk);
      }
    });

    if (positionedShips.length === sunkShips.length) {
      this.lostGame = true;
      console.log("You lost!");
      return;
    } else {
      console.log("Aún no has perdido");
      return;
    }
  }
}

let board1 = new Gameboard();

board1.placeShip(board1.board, 1, 1, 1, "horizontal");
// board1.placeShip(board1.board, 1, 2, 2, "horizontal");
// board1.placeShip(board1.board, 1, 3, 3, "horizontal");
// board1.placeShip(board1.board, 1, 5, 5, "horizontal");

// board1.receiveAttack(board1.board, 1, 1);
// board1.receiveAttack(board1.board, 2, 2);
// board1.receiveAttack(board1.board, 3, 3);
// board1.receiveAttack(board1.board, 5, 5);

// board1.checkLoss();

board1.logBoard();
