import playerFactory from "./playerFactory";

function gameBoardFactory() {
  // create 2d array for player gameboard
  const board = [...Array(10)].map(() => Array(10).fill( {label: '', value: 0 } ));
  
  let sunkShips = 0;

  function placeShip(shipName, shipSize, direction, startingX, startingY) {
    // places ship going DOWN
      if (direction === 'vertical') {
        for (let i = 0; i < shipSize; i++) {
          board[startingX][startingY + i] = {label: shipName + ' ' + i, value: 1};
        }
      }
      // places ship going RIGHT
      if (direction === 'horizontal') {
        for (let i = 0; i < shipSize; i++) {
          board[startingX + i][startingY] = {label: shipName + ' ' + i, value: 1};
        }
      } 
    }

  function gameState() {
    sunkShips++;
    if (sunkShips === 5) {
      alert('Game is over!');

      // blocks more shots from being made by adding a listener on the entire main element
      // which captures the event and stops it from propagating back to the box clicked
      let clickBlocker = document.querySelector('main');
      clickBlocker.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
      }, true);

      throw 'GAME IS OVER';
    }
  }

  function checkHit(x, y, opponent) {
    if (board[x][y].value === 1) {
      let tempName = board[x][y].label;
      board[x][y] = {label: tempName, value: 2};

      let opName = '';
      if (opponent == AIBoard) {
        opName = 'AI';
      }
      if (opponent == playerBoard) {
        opName = 'player';
      }
      // sets color of hit
      const box = document.getElementById(opName + 'Box' + x + y);
      box.setAttribute('class', 'boxHit');

      return tempName;
    } 
    if (board[x][y].value === 0) {
      board[x][y] = {label: '', value: 3};

      let opName = '';
      if (opponent == AIBoard) {
        opName = 'AI';
      }
      if (opponent == playerBoard) {
        opName = 'player';
      }
      // sets color of miss
      const box = document.getElementById(opName + 'Box' + x + y);
      box.setAttribute('class', 'boxMiss');

      return false;
    } 
  }

  return {
    board,
    placeShip,
    gameState,
    checkHit,
    sunkShips
  };
}

const player = playerFactory('player');
const playerBoard = gameBoardFactory();
const AI = playerFactory('AI');
const AIBoard = gameBoardFactory();

export default function runGame() {
  (function placeShips() {
    playerBoard.placeShip(player.ships.carrier.name, player.ships.carrier.shipSize, 'vertical', 0, 0);
    playerBoard.placeShip(player.ships.battleship.name, player.ships.battleship.shipSize, 'horizontal', 1, 1);
    playerBoard.placeShip(player.ships.cruiser.name, player.ships.cruiser.shipSize, 'vertical', 6, 6);
    playerBoard.placeShip(player.ships.submarine.name, player.ships.submarine.shipSize, 'vertical', 8, 8);
    playerBoard.placeShip(player.ships.destroyer.name, player.ships.destroyer.shipSize, 'horizontal', 5, 2);

    AIBoard.placeShip(AI.ships.carrier.name, AI.ships.carrier.shipSize, 'vertical', 0, 0);
    AIBoard.placeShip(AI.ships.battleship.name, AI.ships.battleship.shipSize, 'horizontal', 1, 1);
    AIBoard.placeShip(AI.ships.cruiser.name, AI.ships.cruiser.shipSize, 'vertical', 6, 6);
    AIBoard.placeShip(AI.ships.submarine.name, AI.ships.submarine.shipSize, 'vertical', 8, 8);
    AIBoard.placeShip(AI.ships.destroyer.name, AI.ships.destroyer.shipSize, 'horizontal', 5, 2);
  })();

  // this array mirrors the board arrays and tracks where the AI has shot
  const AIShots = [...Array(10)].map(() => Array(10).fill(0));

  const playerShot = (e) => {
    const workingArr = e.target.id.split('');
    const x = workingArr[workingArr.length - 2];
    const y = workingArr[workingArr.length - 1];

    if (AIBoard.board[x][y].value === 0 || AIBoard.board[x][y].value === 1) {
      player.shootEnemy(x, y, AIBoard);
      AIShot();
    } else {
      console.log('spot has been clicked');
    }
  };

  const AIMapping = document.getElementById('AIBoard');
  AIMapping.addEventListener('click', playerShot);

  const AIShot = () => {
    let goodAIShot = false;
    let AIx = 0;
    let AIy = 0;

    // check shots array to not shoot the same spot twice
    while (goodAIShot === false) {
      AIx = Math.floor(Math.random() * 10);
      AIy = Math.floor(Math.random() * 10);

      if (AIShots[AIx][AIy] === 0) {
        goodAIShot = true;
        AIShots[AIx][AIy] = 1;
      }
    }
    
    AI.shootEnemy(AIx, AIy, playerBoard);
  };


}

