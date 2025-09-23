// app.style.backgroundColor = "red";
const app = document.getElementById("app");

export default function displayGameboards(board1, board2) {
  const objectBoards = [board1, board2];
  const boards = [];

  objectBoards.forEach(() => {
    let board = document.createElement("div");
    board.classList.add("board");
    app.appendChild(board);

    boards.push(board);
  });

  for (let i = 0; i < board1.length; i++) {
    board1[i].forEach((element) => {
      let cell = document.createElement("div");
      cell.innerHTML = "cell";
      boards[0].appendChild(cell);
    });
  }

  for (let i = 0; i < board2.length; i++) {
    board2[i].forEach((element) => {
      let cell = document.createElement("div");
      cell.innerHTML = "cell";
      boards[1].appendChild(cell);
    });
  }
}
