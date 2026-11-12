import { getUserId } from './session.js';
import { createRankingEntry } from './api/firebase.js';
import { initRegistration } from './registration.js';
import { initGameForm } from './game-form.js';
import { initLogout } from './logout.js';
import { Game } from './game.js';
import { Timer, formatTime } from './timer.js';
import { showRanking } from './ranking.js';

const userForm = document.getElementById('user-form');
const gameView = document.getElementById('game');
const gameMessage = document.getElementById('game-message');

async function handleWin(time, cardsNumber) {
    gameMessage.textContent = `¡Has ganado en ${formatTime(time)}!`;

    try {
        const newEntryId = await createRankingEntry(getUserId(), time, cardsNumber);
        await showRanking(newEntryId);
    } catch {
        gameMessage.textContent = 'Has ganado, pero no se ha podido guardar el resultado.';
    }
}

const timer = new Timer(document.getElementById('timer'));
const game = new Game(document.getElementById('game-board'), timer, handleWin);

function showGameView() {
    userForm.hidden = true;
    gameView.hidden = false;
    showRanking();
}

initRegistration(showGameView);
initGameForm(game, () => {
    gameMessage.textContent = '';
});
initLogout();

if (getUserId()) {
    showGameView();
}
