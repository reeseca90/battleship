export default function gameBoardFactory() {
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
    console.log(placedShips);
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

  function gameState() {
    if (placedShips === sunkShips) {
      console.log('game over!');
    } else {
      console.log('keep shooting!');
    }
  }

  return {
    board,
    placeShip,
    checkHit,
    gameState
  };
}

