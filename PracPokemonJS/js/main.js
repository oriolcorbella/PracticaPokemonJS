import { getUserId } from './session.js';
import { initRegistration } from './registration.js';

const userForm = document.getElementById('user-form');
const gameView = document.getElementById('game');

function showGameView() {
    userForm.hidden = true;
    gameView.hidden = false;
}

initRegistration(showGameView);

if (getUserId()) {
    showGameView();
}
