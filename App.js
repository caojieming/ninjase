import React from 'react';
import {level1, level2, level3} from './model/levels.js';
import {redrawCanvas} from './boundary/boundary.js';
import {Model} from './model/model.js';
import {chooseConfig, moveNinjase, pickUp, reset} from './controller/controller.js';

const config1Button = {
  position: "absolute",
  left: 700,
  top: 50,
}
const config2Button = {
  position: "absolute",
  left: 700,
  top: 75,
}
const config3Button = {
  position: "absolute",
  left: 700,
  top: 100,
}
const leftButton = {
  position: "absolute",
  left: 690,
  top: 230,
}
const upButton = {
  position: "absolute",
  left: 730,
  top: 200,
}
const downButton = {
  position: "absolute",
  left: 730,
  top: 260,
}
const rightButton = {
  position: "absolute",
  left: 770,
  top: 230,
}
const pickUpButton = {
  position: "absolute",
  left: 721,
  top: 230,
}
const moveCounter = {
  position: "absolute",
  left: 680,
  top: 320,
}
const resetButton = {
  position: "absolute",
  left: 720,
  top: 400,
}



function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0);
  const canvasRef = React.useRef(null);//empty placeholder, for reference
  const [currLevel, setCurrLevel] = React.useState(1);


  //everytime model changes, this is run
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current);
    
    if(model.puzzle.numLockedDoors <= 0) {
      //forces alert to popup after redraw
      setTimeout(() => alert("You win!"), 0);
    }
  }, [model, redraw])


  const config1Click = (e) => {
    setCurrLevel(1);
    setModel(chooseConfig(1));
  }
  const config2Click = (e) => {
    setCurrLevel(2);
    setModel(chooseConfig(2));
  }
  const config3Click = (e) => {
    setCurrLevel(3);
    setModel(chooseConfig(3));
  }
  const leftClick = (e) => {
    setModel(moveNinjase(model, "left"));
  }
  const upClick = (e) => {
    setModel(moveNinjase(model, "up"));
  }
  const downClick = (e) => {
    setModel(moveNinjase(model, "down"));
  }
  const rightClick = (e) => {
    setModel(moveNinjase(model, "right"));
  }
  const pickUpClick = (e) => {
    setModel(pickUp(model));
  }
  const resetClick = (e) => {
    setModel(reset(currLevel));
  }


  return (
    <main>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width="800"
        height="800">

      </canvas>

      <button style={config1Button} onClick={config1Click}>Level 1</button>
      <button style={config2Button} onClick={config2Click}>Level 2</button>
      <button style={config3Button} onClick={config3Click}>Level 3</button>

      <button style={leftButton} onClick={leftClick}>&lt;</button>
      <button style={upButton} onClick={upClick}>^</button>
      <button style={downButton} onClick={downClick}>v</button>
      <button style={rightButton} onClick={rightClick}>&gt;</button>
      <button style={pickUpButton} onClick={pickUpClick}>Grab</button>

      <label style={moveCounter}>{"number moves: " + model.numMoves}</label>

      <button style={resetButton} onClick={resetClick}>Reset</button>
      
    </main>
  );
}

export default App;
