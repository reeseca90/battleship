function playerFactory(name) {

  function shootEnemy(x, y, opponent) {
    const wasHit = opponent.checkHit(x, y);
    if (wasHit != false) {
      routeHit(wasHit, opponent);
    }
  }

  const routeHit = (shipInfo, opponent) => {
    const workingStr = shipInfo.split(' ');
    ships[workingStr[0]].receiveHit(workingStr[1]);
    const wasSunk = ships[workingStr[0]].checkIfSunk();
    if (wasSunk) {
      opponent.gameState();
    }
  }

  const ships = {
    carrier: shipFactory('carrier', 5),
    battleship: shipFactory('battleship', 4),
    cruiser: shipFactory('cruiser', 3),
    submarine: shipFactory('submarine', 2),
    destroyer: shipFactory('destroyer', 2)
  }

  return {
    name,
    ships,
    routeHit,
    shootEnemy
  }
}

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
      console.log('game over!');
      throw 'GAME IS OVER';
    } else {
      console.log('keep shooting!');
    }
  }

  function checkHit(x, y) {
    if (board[x][y].value === 1) {
      let tempName = board[x][y].label;
      console.log('it\'s a hit!'); // pass this to the ship object
      console.log('set board color to red');
      board[x][y] = {label: tempName, value: 2};
      return tempName;
    } 
    if (board[x][y].value === 0) {
      console.log('it\'s a miss!'); // pass this to the ship object
      console.log('set board color to green');
      board[x][y] = {label: '', value: 3};
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

function shipFactory(name, size) {
  const shipSize = size;
  const shipHits = [];
  let isSunk = false;

  for (let i = 0; i < shipSize; i++) {
    shipHits.push(0);
  }

  const receiveHit = (num) => {
    if (shipHits[num] === 0) {
      shipHits[num] = 1;
    }
  }

  const checkIfSunk = () => {
    if (shipHits.reduce((total, curr) => total + curr) === shipSize) {
      isSunk = true;
      console.log('ship is sunk!');
      return true;
    }
  }

  return {
    name,
    shipSize,
    shipHits,
    isSunk,
    receiveHit,
    checkIfSunk
  }
}

const player = playerFactory('player');
const playerBoard = gameBoardFactory();
const AI = playerFactory('AI');
const AIBoard = gameBoardFactory();

function placeShips() {
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
}

function runGame() {
  placeShips();
  // this array mirrors the board arrays and tracks where the AI has shot
  const AIShots = [...Array(10)].map(() => Array(10).fill(0));

  // this loop actually runs the game
  while (AIBoard.gameOver != true) {
    player.shootEnemy(prompt('enter X'), prompt('enter Y'), AIBoard);

    (() => {
      let goodAIShot = false;
      let AIx = 0;
      let AIy = 0;

      // check shots array to not shoot the same spot twice
      while (goodAIShot === false) {
        AIx = Math.floor(Math.random() * 10);
        AIy = Math.floor(Math.random() * 10);

        if (AIShots[AIx][AIy] === 0) {
          goodAIShot = true;
        }
      }
      
      AI.shootEnemy(AIx, AIy, playerBoard);
    })();
  }
}

