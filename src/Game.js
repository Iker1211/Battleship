import Player from "./Player.js";

export default class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2);
  }
}
