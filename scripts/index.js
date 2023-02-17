const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const addMarks = (row, column, value) => {
    if (!board[row][column]) {
      board[row][column] = value;

      gameController.changeCurrentPlayer();
      gameController.displayBoard();
    }
  };

  return { board, addMarks };
})();

const gameController = (() => {
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");

  let currentPlayer = player1;

  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 3; x++) {
        if (gameBoard.board[i][x] && !boardFields[3 * i + x].hasChildNodes()) {
          const fieldValue = document.createElement("span");
          fieldValue.textContent = gameBoard.board[i][x];
          boardFields[3 * i + x].appendChild(fieldValue);
        }
      }
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  const changeCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  return { displayBoard, getCurrentPlayer, changeCurrentPlayer };
})();

const boardFields = [...document.querySelectorAll(".board-field")];

boardFields.forEach((field) => {
  field.addEventListener("click", () => {
    gameBoard.addMarks(
      field.getAttribute("data-row"),
      field.getAttribute("data-col"),
      gameController.getCurrentPlayer().mark
    );
  });
});
