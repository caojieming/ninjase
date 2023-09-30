import {level1, level2, level3} from './levels.js';

//contains 3 levels, puzzle
export class Model {
  constructor(level) {
    this.level = level;
    this.numMoves = 0;
    this.puzzle = new Puzzle(level);
  }

  copy() {
    const m = new Model(this.level);
    m.numMoves = this.numMoves;
    m.puzzle = this.puzzle.copy();
    return m;
  }
}

export class Puzzle {
  //ninjase argument is optional, defaults to level.ninjase
  constructor(level, ninjase = level.ninjase) {
    this.level = level;
    this.nr = level.rows;
    this.nc = level.columns;
    this.numLockedDoors = 0;

    //create nr x nc cell objects for the puzzle

    //creates board, all cells are by default empty cells
    this.cells = [];
    for(let r = 0; r < this.nr; r++) {
      this.cells[r] = [];
      for(let c = 0; c < this.nc; c++) {
        this.cells[r][c] = new Cell(r, c, "empty", "blank");
      }
    }

    //setting wall cells
    let walls = level.walls;
    for(let i = 0; i < walls.length; i++) {
      let wallR = walls[i].row;
      let wallC = walls[i].column;
      this.cells[wallR][wallC].type = "wall";
    }

    //setting door cells
    let doors = level.doors;
    for(let i = 0; i < doors.length; i++) {
      this.numLockedDoors++;
      let doorR = doors[i].row;
      let doorC = doors[i].column;
      let doorColor = doors[i].color;
      this.cells[doorR][doorC].type = "door";
      this.cells[doorR][doorC].color = doorColor;
    }

    //setting key cells
    let keys = level.keys;
    for(let i = 0; i < keys.length; i++) {
      let keyR = keys[i].row;
      let keyC = keys[i].column;
      let keyColor = keys[i].color;
      this.cells[keyR][keyC].type = "empty";
      this.cells[keyR][keyC].color = keyColor;
    }

    //setting the ninja-se cell
    this.ninjase = ninjase;
    let ninjaseR = this.ninjase.row;
    let ninjaseC = this.ninjase.column;
    this.cells[ninjaseR][ninjaseC].type = "ninjase";
    //heldColor is blank by default
  }

  copy() {
    //remembers ninjase's position in copy
    const copy = new Puzzle(this.level, this.ninjase);
    //equivalent of the double for loop from earlier
    copy.cells = this.cells.map(row => row.map(cell => cell.copy()));
    copy.numLockedDoors = this.numLockedDoors;
    return copy;
  }

}

export class Cell {
  constructor(r, c, type, color, heldColor = "blank") {
    this.row = r;
    this.col = c;
    this.type = type;
    this.color = color; //color of key on the cell
    this.heldColor = heldColor; //if ninjase is holding a key, this is the color
  }

  copy() {
    return new Cell(this.row, this.col, this.type, this.color, this.heldColor);
  }
}
