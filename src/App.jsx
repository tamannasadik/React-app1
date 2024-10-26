import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board) => {
    for (let pattern of winningPattern) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] !== "") return;

    const newBoard = board.slice();
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);

    const winner = checkWin(newBoard);
    if (winner) {
      setMessage(`🎉 ${winner} Wins!`);
      setShowPopup(true);
    } else if (newBoard.every((el) => el !== "")) {
      setMessage("😎 It's a Draw!");
      setShowPopup(true);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setXTurn(true);
    setMessage("");
    setShowPopup(false);
  };

  return (
    <div className="wrapper">
      <h1>Tic-Tac-Toe</h1>
      <div className="container">
        {board.map((value, index) => (
          <button
            key={index}
            className="button-option"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button id="restart" onClick={restartGame}>
        Restart
      </button>

      {showPopup && (
        <div className="popup">
          <p id="message">{message}</p>
          <button id="new-game" onClick={restartGame}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
