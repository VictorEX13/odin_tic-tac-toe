const gameBoard = (() => {
  const board = [
    [, ,],
    [, ,],
    [, ,],
  ];

  const displayBoard = () => {
    const boardFields = [...document.querySelectorAll(".board-field")];

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 3; x++) {
        const fieldValue = document.createElement("span");
        fieldValue.textContent = board[i][x];
        boardFields[3 * i + x].appendChild(fieldValue);
      }
    }
  };

  return { board, displayBoard };
})();

const gameFlow = (() => {
  return {};
})();

const playerFactory = (name) => {
  return { name };
};
