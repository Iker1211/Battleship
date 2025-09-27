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

  checkCollision(newShip) {
    // Recorre todos los barcos ya colocados
    for (let ship of this.ships) {
      if (!ship.coordinates) continue;
      for (let [col, row] of ship.coordinates) {
        // ¿Alguna coordenada del nuevo barco coincide?
        if (newShip.coordinates.some(([c, r]) => c === col && r === row)) {
          console.log("aya", col, row);
          return true; // Hay colisión
        } else {
          console.log("no aya", col, row);
        }
      }
    }
    return false; // No hay colisión
  }

  placeShip(board, length, y, x, orientation) {
    if (x < 1 || x > 10 || y < 1 || y > 10) {
      return false;
    }

    let newShip = new Ship(length, y, x, orientation);

    if (typeof newShip.x == !"number" || typeof newShip.y == !"number") {
      return false;
    }

    // Marca las posiciones del barco en el tablero y guarda las coordenadas
    newShip.coordinates = [];
    if (orientation === "horizontal") {
      if (x + length - 1 > 10) return false;
      for (let i = 0; i < length; i++) {
        newShip.coordinates.push([x + i, y]);
      }
    } else if (orientation === "vertical") {
      if (y + length - 1 > 10) return false;
      for (let i = 0; i < length; i++) {
        newShip.coordinates.push([x, y + i]);
      }
    } else {
      return false;
    }

    if (this.checkCollision(newShip)) {
      newShip.hasCollision = true;
      return newShip;
    }

    if (orientation === "horizontal") {
      for (let i = 0; i < length; i++) {
        board[y - 1][x - 1 + i] = "ship";
      }
    } else {
      for (let i = 0; i < length; i++) {
        board[y - 1 + i][x - 1] = "ship";
      }
    }

    this.ships.push(newShip);
    return true;
  }

  logShips() {
    console.log(this.ships);
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

board1.placeShip(board1.board, 1, 2, 2, "horizontal");
board1.placeShip(board1.board, 1, 1, 1, "horizontal");
board1.placeShip(board1.board, 1, 1, 1, "horizontal");
board1.placeShip(board1.board, 1, 1, 1, "horizontal");

board1.logShips();
