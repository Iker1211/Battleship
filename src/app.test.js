import Ship from "./Ship.js"
import Gameboard from "./Gameboard.js"

test('ship exists', () => {
    let ship1 = new Ship(1, 0, false, 1, 1, "horizontal");
    expect(ship1).toBeDefined();
});

test('gameboard exists', () => {
    const gameboard1 = new Gameboard();
    expect(gameboard1).toBeDefined();
    expect(gameboard1.placeShip()).toBeFalsy(); //Faltan los argumentos
    expect(gameboard1.placeShip(gameboard1.board, 1, 0, false, 1, 1, "horizontal")).toBeTruthy();
});