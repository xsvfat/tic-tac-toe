const prompt = require('prompt');

class Game {
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.winner = null;
    this.currentPlayer = 0;
    this.playerOne = 0;
    this.playerTwo = 0;
  }

  printBoard() {
    const finalBoard = [];
    for (const row of this.board) {
      const finalRow = [];
      for (const cell of row) {
        switch (cell) {
          case 0: finalRow.push(' X ');
            break;
          case 1: finalRow.push(' O ');
            break;
          default: finalRow.push(' - ');
        }
      }
      finalBoard.push(finalRow);
    }
    console.log(finalBoard);
  }

  makeMove(i, j) {
    const playerNumber = this.currentPlayer % 2;
    this.board[i][j] = playerNumber;
    this.currentPlayer += 1;
  }
  checkWinner() {
    if (
      this.checkRows() ||
      this.checkColumns() ||
      this.checkLeftDiagonal() ||
      this.checkRightDiagonal()
      ) {
      return true;
    }
    return false;
  }

  clearCount() {
    this.playerOne = 0;
    this.playerTwo = 0;
  }

  checkRows() {
    for (const row of this.board) {
      for (let i = 0; i < 3; i++) {
        if (row[i] !== null) {
          row[i] === 0 ? this.playerOne+=1 : this.playerTwo+=1;
        }
      }
      if (this.checkCount()) {
        return true;
      }
    }
    return false;
  }

  checkColumns() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[j][i] !== null) {
          this.board[j][i] === 0 ? this.playerOne+=1 : this.playerTwo+=1;
        }
      }
      if (this.checkCount()) {
        return true;
      }
    }
    return false;
  }

  checkLeftDiagonal() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][i] !== null) {
        this.board[i][i] === 0 ? this.playerOne+=1 : this.playerTwo+=1;
      }
    }
    if (this.checkCount()) {
      return true;
    }
    return false;
  }

  checkRightDiagonal() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][i] !== null) {
        this.board[2-i][i] === 0 ? this.playerOne+=1 : this.playerTwo+=1;
      }
    }
    if (this.checkCount()) {
      return true;
    }
    return false;
  }

  checkCount() {
    if (this.playerOne === 3 || this.playerTwo === 3) {
      this.winner = this.playerOne > this.playerTwo ? 1 : 2;
      return true;
    }
    this.clearCount();
    return false;
  }
}


prompt.start();
const game = new Game();

// playGame();


const runTurn = () => {
  prompt.get(['x_coordinate', 'y_coordinate'], (err, result) => {
    game.makeMove(result.x_coordinate, result.y_coordinate);
    game.printBoard();
    if (!game.checkWinner()) {
      runTurn();
    } else {
      console.log("There is a winner and they are player:", game.winner);
    }
  });
};
runTurn();

