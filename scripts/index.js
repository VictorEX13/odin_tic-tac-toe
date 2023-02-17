const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const getBoardField = (row, col) => board[row][col];

  const getRow = (rowNumber) => board[rowNumber];

  const getColumn = (colNumber) => board.map((x) => x[colNumber]);

  const getDiagonalLeftToRight = () => [board[0][0], board[1][1], board[2][2]];

  const getDiagonalRightToLeft = () => [board[0][2], board[1][1], board[2][0]];

  const addMarks = (row, column, value) => {
    if (!board[row][column]) {
      board[row][column] = value;

      gameController.checkGameState();
      gameController.switchCurrentPlayer();
      gameController.displayBoard();
    }
  };

  return {
    getBoard,
    getBoardField,
    getRow,
    getColumn,
    getDiagonalLeftToRight,
    getDiagonalRightToLeft,
    addMarks,
  };
})();

const gameController = (() => {
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");

  let currentPlayer = player1;

  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 3; x++) {
        if (
          gameBoard.getBoardField(i, x) &&
          !boardFields[3 * i + x].hasChildNodes()
        ) {
          const fieldValue = document.createElement("span");
          fieldValue.textContent = gameBoard.getBoardField(i, x);
          boardFields[3 * i + x].appendChild(fieldValue);
        }
      }
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkGameState = () => {
    if (gameBoard.getBoard().every((arr) => arr.every((i) => i))) {
      return "Draw!";
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.getRow(i).every((val, i, arr) => val && val === arr[0]) ||
        gameBoard.getColumn(i).every((val, i, arr) => val && val === arr[0]) ||
        gameBoard
          .getDiagonalLeftToRight()
          .every((val, i, arr) => val && val === arr[0]) ||
        gameBoard
          .getDiagonalRightToLeft()
          .every((val, i, arr) => val && val === arr[0])
      ) {
        return `The winner is ${currentPlayer.name}!!!`;
      }
    }
  };

  return {
    getCurrentPlayer,
    displayBoard,
    switchCurrentPlayer,
    checkGameState,
  };
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
