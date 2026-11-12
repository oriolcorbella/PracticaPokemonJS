import { getUserId } from './session.js';
import { initRegistration } from './registration.js';
import { initGameForm } from './game-form.js';
import { Game } from './game.js';
import { Timer, formatTime } from './timer.js';

const userForm = document.getElementById('user-form');
const gameView = document.getElementById('game');
const gameMessage = document.getElementById('game-message');

function handleWin(time) {
    gameMessage.textContent = `¡Has ganado en ${formatTime(time)}!`;
}

const timer = new Timer(document.getElementById('timer'));
const game = new Game(document.getElementById('game-board'), timer, handleWin);

function showGameView() {
    userForm.hidden = true;
    gameView.hidden = false;
}

initRegistration(showGameView);
initGameForm(game, () => {
    gameMessage.textContent = '';
});

if (getUserId()) {
    showGameView();
}
