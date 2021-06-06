import React, { useState, useRef, useEffect } from "react";
import Chess from "chess.js"
import ChessBoard from "chessboardjsx"

const boardContainer = {
  "margin-top": "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
};

function App() {

  const [fen, setFen] = useState("start")
  let game = useRef(null);

  useEffect(() => {
     game.current = new Chess();
  },[])

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    })
    if (move === null) return;
    setFen(game.current.fen());
  }

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start")
  }

  return (
    <>
      {
        game.current && game.current.game_over() ?
          (<>
            <div style={{ textAlign: "center" }}>
            <h1>Game Over</h1>
            <button onClick={resetGame}>Play Again</button>
            </div>
          </>)
          : <span></span>
      }
      <div className="App" style={boardContainer}>
        <ChessBoard position={fen} onDrop={onDrop}/>
      </div>
      </>
  );
}



export default App;
