const BOXSIZE = 100;
const OFFSET = 5;
const PADDING = 15;

export class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}

export function computeSquare(cell) {
  return new Square(BOXSIZE*cell.col + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET);
}

//redraw puzzle
export function redrawCanvas(model, canvasObj) {
  const ctx = canvasObj.getContext('2d');
  ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

  let nr = model.puzzle.nr;
  let nc = model.puzzle.nc;


  for(let r = 0; r < nr; r++) {
    for(let c = 0; c < nc; c++) {
      let cell = model.puzzle.cells[r][c];
      let sqr = computeSquare(cell);

      //draw cell here:
      ctx.beginPath();

      if(cell.type === "wall") {
        ctx.fillStyle = 'black';
        ctx.fillRect(sqr.x, sqr.y, sqr.size, sqr.size);
      }
      else if(cell.type === "door") {
        ctx.fillStyle = 'black';
        ctx.fillRect(sqr.x, sqr.y, sqr.size, sqr.size);

        let doorColor = cell.color;
        ctx.fillStyle = doorColor;
        ctx.fillRect(sqr.x+PADDING, sqr.y+PADDING, sqr.size-PADDING*2, sqr.size-PADDING*2);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(sqr.x+PADDING*2, sqr.y+PADDING*2, sqr.size-PADDING*4, sqr.size-PADDING*4);
      }
      else if(cell.type === "empty" && cell.color !== "blank") {
        ctx.fillStyle = 'black';
        ctx.rect(sqr.x, sqr.y, sqr.size, sqr.size);

        let keyColor = cell.color;
        ctx.fillStyle = keyColor;
        ctx.fillRect(sqr.x+PADDING*2, sqr.y+PADDING*2, sqr.size-PADDING*4, sqr.size-PADDING*4);
      }
      else if(cell.type === "ninjase") {
        ctx.fillStyle = 'purple';
        ctx.fillRect(sqr.x, sqr.y, sqr.size, sqr.size);

        let ninjaseColor = cell.heldColor;
        if(ninjaseColor === "blank") {
          //nothing since there is no key
        }
        else {
          ctx.fillStyle = ninjaseColor;
          ctx.fillRect(sqr.x+PADDING*2, sqr.y+PADDING*2, sqr.size-PADDING*4, sqr.size-PADDING*4);
        }
      }
      else {
        //otherwise assumes empty cell
        ctx.fillStyle = 'black';
        ctx.rect(sqr.x, sqr.y, sqr.size, sqr.size);
      }

      ctx.stroke();
     
      
    }
  }
}