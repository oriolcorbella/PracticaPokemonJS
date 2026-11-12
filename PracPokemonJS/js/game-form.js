import { validateCardsNumber } from './validation.js';
import { showModal } from './modal.js';

export function initGameForm(game, onGameStart) {
    const gameForm = document.getElementById('game-form');
    const cardsInput = document.getElementById('cards-number');
    const playButton = document.getElementById('play-btn');

    gameForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const error = validateCardsNumber(cardsInput.value);

        if (error) {
            showModal(error);
            return;
        }

        playButton.textContent = 'Volver a jugar';
        onGameStart();

        try {
            await game.start(Number(cardsInput.value));
        } catch {
            showModal('No se han podido cargar los pokemons. Inténtalo de nuevo.');
        }
    });
}
