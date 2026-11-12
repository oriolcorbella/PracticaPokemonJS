import { MAX_POKEMON_ID } from './api/config.js';
import { getPokemonImage } from './api/pokeapi.js';
import { fitCardsToBoard } from './board-layout.js';
import {
    getRandomPokemonIds,
    shuffle,
    createCard,
    showCard,
    hideCard,
    markAsMatched,
} from './cards.js';

const FLIP_BACK_DELAY = 1000;

export class Game {
    constructor(board, timer, onWin) {
        this.board = board;
        this.timer = timer;
        this.onWin = onWin;

        this.cardsNumber = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLocked = false;
        this.flipBackTimeoutId = null;
        // Sirve para ignorar una partida que se ha reiniciado mientras cargaba
        this.gameNumber = 0;

        this.board.addEventListener('click', (event) => {
            const card = event.target.closest('.card');

            if (card) {
                this.handleCardClick(card);
            }
        });

        window.addEventListener('resize', () => fitCardsToBoard(this.board));
    }

    async start(cardsNumber) {
        this.stop();
        this.gameNumber++;
        const currentGame = this.gameNumber;

        this.cardsNumber = cardsNumber;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLocked = false;

        const pokemonIds = getRandomPokemonIds(cardsNumber / 2, MAX_POKEMON_ID);
        const images = await Promise.all(pokemonIds.map((id) => getPokemonImage(id)));

        if (currentGame !== this.gameNumber) {
            return;
        }

        const cards = [];
        pokemonIds.forEach((id, index) => {
            cards.push(createCard(id, images[index]));
            cards.push(createCard(id, images[index]));
        });

        this.board.replaceChildren(...shuffle(cards));
        fitCardsToBoard(this.board);
        this.timer.start();
    }

    stop() {
        this.timer.stop();
        clearTimeout(this.flipBackTimeoutId);
        this.board.replaceChildren();
    }

    handleCardClick(card) {
        // Las cartas giradas o emparejadas ya tienen la clase "flipped"
        if (this.isLocked || card.classList.contains('flipped')) {
            return;
        }

        showCard(card);
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.checkPair();
        }
    }

    checkPair() {
        const [firstCard, secondCard] = this.flippedCards;

        if (firstCard.dataset.id === secondCard.dataset.id) {
            markAsMatched(firstCard);
            markAsMatched(secondCard);
            this.flippedCards = [];
            this.matchedPairs++;

            if (this.matchedPairs === this.cardsNumber / 2) {
                this.win();
            }
            return;
        }

        this.isLocked = true;
        this.flipBackTimeoutId = setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
            this.flippedCards = [];
            this.isLocked = false;
        }, FLIP_BACK_DELAY);
    }

    win() {
        this.timer.stop();
        this.onWin(this.timer.seconds, this.cardsNumber);
    }
}
