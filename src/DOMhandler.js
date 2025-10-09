const app = document.getElementById("app");

export function displayShots() {
  const boards = document.getElementsByClassName("board");
  Array.from(boards).forEach((board) => {
    board.addEventListener("click", (event) => {
      console.log("Board clicked!", event.target);
      shot.play();
    });
  });

  drawShots();

  //Tambien es necesario un listener de la funcion receiveAttack del gameboard
}

export function drawShots(gameboard = null, prefix = "enemigo") {

  if (!gameboard || !gameboard.shots) return;
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const boards = document.getElementsByClassName("board");

  // Array.from(boards).forEach((board) => {
  //   board.addEventListener("click", (event) => {
  //     console.log("Board clicked!", event.target);
  //     let something = document.createElement("div");
  //     something.classList.add("shot");
  //     event.target.appendChild(something);
  //   });
  // });

  gameboard.shots.forEach(({ col, row }) => {
    const cellId = `${prefix}-${alphabet[col - 1]}${row}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      let shotDiv = document.createElement("div");
      shotDiv.classList.add("shot");
      cell.appendChild(shotDiv);
    }
  });

  //Tambien es necesario un listener de la funcion receiveAttack del gameboard
}

export function displayGameboards(board1, board2) {
  const objectBoards = [board1, board2];
  const boards = [];

  app.innerHTML = ""; // Limpiar el contenido previo

  objectBoards.forEach(() => {
    let board = document.createElement("div");
    board.classList.add("board");
    app.appendChild(board);

    boards.push(board);
  });

  for (let i = 0; i < 10; i++) {
    let rowNum = 10 - i;

    for (let j = 0; j < 10; j++) {
      let colChar = String.fromCharCode(65 + j); // 65 is 'A'
      let cell = document.createElement("div");
      // cell.innerHTML = "🌊";
      cell.setAttribute("class", "amigo");
      cell.setAttribute("id", `amigo-${colChar}${rowNum}`);
      boards[0].appendChild(cell);
    }
  }

  for (let i = 0; i < 10; i++) {
    let rowNum = 10 - i;
    for (let j = 0; j < 10; j++) {
      let colChar = String.fromCharCode(65 + j);
      let cell = document.createElement("div");
      cell.setAttribute("class", "enemigo");
      cell.setAttribute("id", `enemigo-${colChar}${rowNum}`);
      boards[1].appendChild(cell);
    }
  }
}

export function displayShips(board1, board2) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  board1.forEach((ship) => {
    if (!ship.coordinates) return; // Evita errores si no hay coordenadas

    ship.coordinates.forEach(([col, row]) => {
      // col: número de columna (1-10), row: número de fila (1-10)
      const cellId = `amigo-${alphabet[col - 1]}${row}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        let shipCointainer = document.createElement("div");
        shipCointainer.classList.add("ship-container");

        cell.appendChild(shipCointainer);
      }
    });
  });

  // Repite para board2 si quieres mostrar los barcos del enemigo
  board2.forEach((ship) => {
    if (!ship.coordinates) return;
    ship.coordinates.forEach(([col, row]) => {
      const cellId = `enemigo-${alphabet[col - 1]}${row}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        cell.classList.add("enemy-ship");
        // cell.innerText = "🚢"; // You cant see the enemies ships
      }
    });
  });
}

export function highlightCollision(ship, isAmigo = true) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  ship.coordinates.forEach(([col, row]) => {
    const prefix = isAmigo ? "amigo" : "enemigo";
    const cellId = `${prefix}-${alphabet[col - 1]}${row}`;
    const cell = document.getElementById(cellId);
    if (cell) cell.classList.add("collision-cell");
  });
}

// Refactorizar la logica de colisiones
