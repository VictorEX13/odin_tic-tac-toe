const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameBoard = (() => {
  let board = [
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

      gameController.highlightCurrentPlayer();
      gameController.checkGameState();
      gameController.switchCurrentPlayer();
      gameController.displayBoard();
    }
  };

  const resetBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    gameController.resetDisplay();
  };

  return {
    getBoard,
    getBoardField,
    getRow,
    getColumn,
    getDiagonalLeftToRight,
    getDiagonalRightToLeft,
    addMarks,
    resetBoard,
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

  const resetDisplay = () => {
    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 3; x++) {
        boardFields[3 * i + x].replaceChildren();
      }
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  const getPlayer1 = () => player1;

  const getPlayer2 = () => player2;

  const setPlayerName = (player, newName) => {
    player.name = newName;
  };

  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const displayPlayersMarks = () => {
    mark1.textContent = player1.mark;
    mark2.textContent = player2.mark;
  };

  const swapPlayersMarks = () => {
    [player1.mark, player2.mark] = [player2.mark, player1.mark];

    switchCurrentPlayer();
    displayPlayersMarks();
  };

  const checkGameState = () => {
    let state = 0;
    let message = "";

    if (gameBoard.getBoard().every((arr) => arr.every((i) => i))) {
      state = 1;
      message = "Draw!";
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
        state = 1;
        message = `The winner is ${currentPlayer.name}!!!`;
      }
    }

    if (state) {
      displayModal(message);
    }
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  const displayModal = (message) => {
    const modalContent = document.querySelector(".modal-content");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Play Again";

    const resultMessage = document.createElement("span");
    resultMessage.textContent = message;

    closeButton.addEventListener("click", () => {
      gameBoard.resetBoard();
      closeModal();
    });

    modalContent.replaceChildren();
    modalContent.appendChild(resultMessage);
    modalContent.appendChild(closeButton);

    modal.style.display = "block";
  };

  const highlightCurrentPlayer = () => {
    mark1.classList.toggle("current");
    mark2.classList.toggle("current");
  };

  return {
    getCurrentPlayer,
    setPlayerName,
    getPlayer1,
    getPlayer2,
    displayBoard,
    switchCurrentPlayer,
    checkGameState,
    displayPlayersMarks,
    swapPlayersMarks,
    resetDisplay,
    highlightCurrentPlayer,
  };
})();

const modal = document.querySelector(".modal");
const boardFields = [...document.querySelectorAll(".board-field")];
const mark1 = document.querySelector(".mark-1");
const mark2 = document.querySelector(".mark-2");
const resetButton = document.querySelector(".reset");
const swapButton = document.querySelector(".swap");
const name1 = document.querySelector(".name-1");
const name2 = document.querySelector(".name-2");

boardFields.forEach((field) => {
  field.addEventListener("click", () => {
    gameBoard.addMarks(
      field.getAttribute("data-row"),
      field.getAttribute("data-col"),
      gameController.getCurrentPlayer().mark
    );
  });
});

resetButton?.addEventListener("click", () => {
  gameBoard.resetBoard();
});

swapButton?.addEventListener("click", () => {
  gameController.swapPlayersMarks();
});

name1?.addEventListener("input", (e) => {
  gameController.setPlayerName(gameController.getPlayer1(), e.target.value);
});

name2?.addEventListener("input", (e) => {
  gameController.setPlayerName(gameController.getPlayer2(), e.target.value);
});

gameController.displayPlayersMarks();
