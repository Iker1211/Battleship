const app = document.getElementById("app");

export function displayGameboards(board1, board2) {
  const objectBoards = [board1, board2];
  const boards = [];

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
      // cell.innerHTML = "🌊";
      cell.setAttribute("class", "enemigo");
      cell.setAttribute("id", `enemigo-${colChar}${rowNum}`);
      boards[1].appendChild(cell);
    }
  }
}

export function displayShips(board1, board2) {

  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    board1.forEach((ship) => {
    if (!ship.coordinates) return; // Evita errores si no hay coordenadas

    ship.coordinates.forEach(([col, row]) => {
      // col: número de columna (1-10), row: número de fila (1-10)
      const cellId = `amigo-${alphabet[col - 1]}${row}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        cell.classList.add("ship");
        
        const ship = "<img src='src/assets/ships/patrol_boat.svg' alt='ship' />";
            // Marca la celda con una clase
        cell.innerHTML = ship; // Opcional: agrega un icono o texto
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

// ahora debo asegurarme de que los ships no colisionen