import events from 'EventEmitter';

const Player = (i) => {
  this.num(i);
  this.active = true;
  this.win = false;
};


const Game = () => {
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  this.players = [new Player(1), new Player(2)];

  this.currentPlayer = 0;
};



module.exports = Game;
