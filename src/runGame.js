import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";

const player = playerFactory('player');
const playerBoard = gameBoardFactory('playerBoard');
const AI = playerFactory('AI');
const AIBoard = gameBoardFactory('AIBoard');

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

