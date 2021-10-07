function playerFactory(name) {

  function shootEnemy(x, y) {
    board.checkHit(x, y);
  }

  const board = gameBoardFactory();

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
    shootEnemy
  }
}

function gameBoardFactory() {
  // create 2d array for player gameboard
  const board = [...Array(10)].map(e => Array(10).fill(0));
  
  let placedShips = 0;
  let sunkShips = 0;

  function placeShip(shipSize, direction, startingX, startingY) {
    // places ship going DOWN
      if (direction === 'vertical') {
        for (let i = 0; i < shipSize; i++) {
          board[startingX][startingY + i] = 1;
        }
      }
      // places ship going RIGHT
      if (direction === 'horizontal') {
        for (let i = 0; i < shipSize; i++) {
          board[startingX + i][startingY] = 1;
        }
      } 
  
      placedShips++;
      console.log(placedShips++);
    }

  function gameState() {
    if (placedShips === sunkShips) {
      console.log('game over!');
    } else {
      console.log('keep shooting!');
    }
  }

  function checkHit(x, y) {
    if (board[x][y] === 1) {
      console.log('it\'s a hit!'); // pass this to the ship object
      console.log('set board color to red');
      board[x][y] = 2;
    } 
    if (board[x][y] === 0) {
      console.log('it\'s a miss!'); // pass this to the ship object
      console.log('set board color to green');
      board[x][y] = 3;
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
    checkIfSunk();
  }

  const checkIfSunk = () => {
    if (shipHits.reduce((total, curr) => total + curr) === shipSize) {
      isSunk = true;
      console.log('ship is sunk!');
    }
  }

  return {
    name,
    shipSize,
    shipHits,
    isSunk,
    receiveHit
  }
}