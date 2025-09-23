import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

test("ship exists", () => {
  let ship1 = new Ship(1, 0, false, 1, 1, "horizontal");
  expect(ship1).toBeDefined();
});

test("gameboard exists", () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1).toBeDefined();
  expect(gameboard1.placeShip()).toBeFalsy(); //Faltan los argumentos

  expect(
    gameboard1.placeShip(gameboard1.board, 1, 1, 1, "horizontal"),
  ).toBeTruthy();

  expect(gameboard1.ships[0]).toEqual({
    properlength: 1,
    timesHit: 0,
    sunk: false,
    y: 1,
    x: 1,
    orientation: "horizontal",
    coordinates: [[1, 1]],
  });
});

test("Players exists", () => {
  let player1 = new Player();
  expect(player1).toBeDefined();
  expect(player1.gameboard).toBeTruthy();
});
