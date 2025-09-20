import Ship from "./Ship.js"
import Gameboard from "./Gameboard.js"

test('ship exists', () => {
    const ship1 = new Ship(4, 4, true);
    expect(ship1).toBeDefined();
    expect(ship1.properlength).toEqual(4);
    expect(ship1.timesHit).toEqual(4);
    expect(ship1.sunk).toBeTruthy();
});

test('gameboard exists', () => {
    const gameboard1 = new Gameboard();
    expect(gameboard1).toBeDefined();
});