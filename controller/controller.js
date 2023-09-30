import {level1, level2, level3} from '../model/levels.js';
import {Model} from '../model/model.js';

//returns the chosen level's model
export function chooseConfig(levelNum) {
  if(levelNum === 1) {
    return new Model(level1);
  }
  else if(levelNum === 2) {
    return new Model(level2);
  }
  else if(levelNum === 3) {
    return new Model(level3);
  }
}

export function moveNinjase(model, direction) {
  let newModel = model.copy();
  let numR = newModel.puzzle.nr;
  let numC = newModel.puzzle.nc;
  let cells = newModel.puzzle.cells;
  let oldRow = model.puzzle.ninjase.row;
  let oldCol = model.puzzle.ninjase.column;

  let newRow = oldRow;
  let newCol = oldCol;

  if(direction === "left") {
    newCol--;
  }
  else if(direction === "up") {
    newRow--;
  }
  else if(direction === "down") {
    newRow++;
  }
  else if(direction === "right") {
    newCol++;
  }

  if(newCol < 0 || newRow < 0 || newCol > numC - 1 || newRow > numR - 1) {
    return model;
  }

  let oldCell = cells[oldRow][oldCol];
  let newCell = cells[newRow][newCol];

  if(newCell.type === "wall") {
    newModel = model;
  }
  else if(newCell.type === "door") {//this includes "unlock door" use case
    if(newCell.color === oldCell.heldColor && oldCell.heldColor !== "blank") {
      //convert door to empty cell and move
      oldCell.type = "empty";
      newCell.type = "ninjase";
      newCell.color = "blank";
      newModel.puzzle.ninjase = { "row":newRow, "column":newCol };

      //remove held key
      oldCell.heldColor = "blank";
      newCell.heldColor = "blank";

      //decrement numLockedDoors
      newModel.puzzle.numLockedDoors--;

      //increment move counter
      newModel.numMoves++;
    }
    else {
      newModel = model;
    }
  }
  else if(newCell.type === "empty" && newCell.color !== "blank") {//key cell
    //move
    oldCell.type = "empty";
    newCell.type = "ninjase";
    newModel.puzzle.ninjase = { "row":newRow, "column":newCol };

    //move any held keys as well
    //let dupe = oldCell.copy();
    let oldPosHeldColor = oldCell.heldColor;
    oldCell.heldColor = "blank";
    newCell.heldColor = oldPosHeldColor;

    //increment move counter
    newModel.numMoves++;
  }
  else if(newCell.type === "empty") {
    //move
    oldCell.type = "empty";
    newCell.type = "ninjase";
    newModel.puzzle.ninjase = { "row":newRow, "column":newCol };

    //move any held keys as well
    //let dupe = oldCell.copy();
    let oldPosHeldColor = oldCell.heldColor;
    oldCell.heldColor = "blank";
    newCell.heldColor = oldPosHeldColor;

    //increment move counter
    newModel.numMoves++;
  }

  return newModel;
}

export function pickUp(model) {
  let newModel = model.copy();
  let ninjaseRow = newModel.puzzle.ninjase.row;
  let ninjaseCol = newModel.puzzle.ninjase.column;
  let ninjaseCell = newModel.puzzle.cells[ninjaseRow][ninjaseCol];

  //swap the ninjaseCell.color (cell key) and ninjaseCell.heldColor (held key)
  let cellKey = ninjaseCell.color;
  let heldKey = ninjaseCell.heldColor;
  ninjaseCell.color = heldKey;
  ninjaseCell.heldColor = cellKey;

  return newModel;
}

export function reset(levelNum) {
  if(levelNum === 1) {
    return new Model(level1);
  }
  else if(levelNum === 2) {
    return new Model(level2);
  }
  else if(levelNum === 3) {
    return new Model(level3);
  }
}
