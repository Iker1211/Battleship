import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill("empty"));
    this.ships = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.missedAttacks = [];
    this.shots = [];
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

    if (x < 1 || x > 10 || y < 1 || y > 10) {
      return false;
    }

    this.shots.push({col: x, row: y});

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
        console.log("oasito");
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

export function randomizeShips(gameboard) {
  const shipConfigs = [
    { count: 1, length: 4 },
    { count: 2, length: 3 },
    { count: 3, length: 2 },
    { count: 4, length: 1 },
  ];

  const orientations = ["horizontal", "vertical"];

  shipConfigs.forEach(({ count, length }) => {
    let placed = 0;
    while (placed < count) {
      const orientation = orientations[Math.floor(Math.random() * 2)];
      let x, y;
      if (orientation === "horizontal") {
        x = Math.floor(Math.random() * (11 - length)) + 1;
        y = Math.floor(Math.random() * 10) + 1;
      } else {
        x = Math.floor(Math.random() * 10) + 1;
        y = Math.floor(Math.random() * (11 - length)) + 1;
      }

      const result = gameboard.placeShip(
        gameboard.board,
        length,
        y,
        x,
        orientation
      );
      // Only count if placement was successful and no collision
      if (result === true) {
        placed++;
      }
    }
  });
}
