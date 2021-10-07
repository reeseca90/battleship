function playerFactory(name) {

  function shootEnemy(x, y) {
    const wasHit = board.checkHit(x, y);
    if (wasHit != false) {
      routeHit(wasHit);
    }
  }

  const board = gameBoardFactory();

  const routeHit = (shipInfo) => {
    const workingStr = shipInfo.split(' ');
    ships[workingStr[0]].receiveHit(workingStr[1]);
    const wasSunk = ships[workingStr[0]].checkIfSunk();
    if (wasSunk) {
      board.gameState();
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
    board,
    routeHit,
    shootEnemy
  }
}

function gameBoardFactory() {
  // create 2d array for player gameboard
  const board = [...Array(10)].map(() => Array(10).fill( {label: '', value: 0 } ));
  
  let placedShips = 0;
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
  
      placedShips++;
      console.log(placedShips);
    }

  function gameState() {
    sunkShips++;
    if (placedShips === sunkShips) {
      console.log('game over!');
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

  // auto add ships into fixed locations

  return {
    board,
    placeShip,
    gameState,
    checkHit
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