export default class Ship {
  constructor(properlength, y, x, orientation) {
    this.properlength = properlength;
    this.timesHit = 0;
    this.sunk = false;
    this.y = y;
    this.x = x;
    this.orientation = orientation;
    this.coordinates = [];
  }

  hit() {
    return this.timesHit++;
  }

  isSunk() {
    if (this.timesHit >= this.properlength) {
      return (sunk = true);
    } else {
      return (sunk = false);
    }
  }
}
