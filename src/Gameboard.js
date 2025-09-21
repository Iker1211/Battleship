import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill("empty"));
    this.ships = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

    for ( let i = 0; i < this.ships.length; i++ ) {
      if (typeof this.ships[i] === "number" ) {
          this.ships[i] = newShip;
          break
      } else {
        console.log("este lugar ya está ocupado")
      }
    }

    console.log("this is" ,this.ships);

    return true;
  }

  receiveAttack(board, x, y) {

    let hitpoint = [x, y]

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }

    this.ships.forEach((ship) => {

      if (typeof ship === "number") return;

      let shipArea = ship.coordinates;

      let atacked = shipArea.find((item) => item[0] === hitpoint[0] && item[1] === hitpoint[1])

      if (atacked) {
        console.log("coño eso dolió");
        ship.hit();
        console.log("veces que ha sido golpeado", ship.timesHit);
      }
      
    })

    // for (let i = 0; i < this.ships.length; i++) {

    //    console.log("ahora", this.ships[i].coordinates);

    //    let actualShip = this.ships[i].coordinates;

    //    for (let j = 0; j < 9; j++) {
    //     console.log("punto del barco", actualShip[j])
    //    }
    // }

    // if (board[x][y] === "ship") {

    //   console.log("coño eso dolió");
    // } 

          // for ( let j of this.ships[i].this.coordinates) {
      //   if (this.ships[i].coordinates[j] === hitpoint ) {
      //     console.log("coño Dios");
      //     break
      //   }
      // }
  }
}

let board1 = new Gameboard();

board1.placeShip(board1.board, 4, 1, 1, "horizontal");

// board1.logBoard();
board1.receiveAttack(board1.board, 1, 1);
