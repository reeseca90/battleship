import './style.css';
import runGame from './runGame';

const newGameButton = document.getElementById('startGame');
newGameButton.addEventListener('click', reloadPage);

const playerBoard = document.getElementById('playerBoard');
const AIBoard = document.getElementById('AIBoard');

for (let i = 0; i < 10; i++) {
  const row = document.createElement('div');
  row.id = 'row' + i;
  for (let j = 0; j < 10; j++) {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = 'playerBox' + i + j;
    row.appendChild(box);
  }
  playerBoard.appendChild(row);
}

for (let i = 0; i < 10; i++) {
  const row = document.createElement('div');
  row.id = 'row' + i;
  for (let j = 0; j < 10; j++) {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = 'AIBox' + i + j;
    row.appendChild(box);
  }
  AIBoard.appendChild(row);
}

function reloadPage() {
  window.location.href = window.location.href;
}

runGame();