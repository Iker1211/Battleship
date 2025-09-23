const app = document.getElementById("app");
app.style.backgroundColor = "red";

export function displayGameboards(board1, board2) {
  const objectBoards = [board1, board2];
  const boards = [];

  let board1rowsCounter = 11;
  let board2rowsCounter = 11;

  objectBoards.forEach(() => {
    let board = document.createElement("div");
    board.classList.add("board");
    app.appendChild(board);

    boards.push(board);
  });

  for (let i = 0; i < board1.length; i++) {

        board1rowsCounter--;
        let columnsCounter = 64; // ASCII code 

    board1[i].forEach((element) => {

        columnsCounter++;

      let cell = document.createElement("div");
      cell.innerHTML = "cell";
      cell.setAttribute("id", "friend" + String.fromCharCode(columnsCounter) + board1rowsCounter);
      boards[0].appendChild(cell);
    });
  }

  for (let i = 0; i < board2.length; i++) {

    board2rowsCounter--;
    let columnsCounter = 64; // ASCII code 

    board2[i].forEach((element) => {

        columnsCounter++;

      let cell = document.createElement("div");
      cell.innerHTML = "cell";
      cell.setAttribute("id", "enemy" + String.fromCharCode(columnsCounter) + board2rowsCounter);
      boards[1].appendChild(cell);
    });
  }
}

export function displayShips(board1, board2) {
    console.log("the boards", board1, board2);
}