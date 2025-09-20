export default class Ship {
    constructor(properlength, timesHit, sunk, y, x, orientation) {
        this.properlength = properlength;
        this.timesHit = timesHit;
        this.sunk = sunk;
        this.y = y;
        this.x = x;
        this.orientation = orientation;
    }

    hit() {
        return this.timesHit++;
    }

    isSunk() {
        if (this.timesHit >= this.properlength) {
            return sunk = true;
        } else {
            return sunk = false;
        }
    }
}