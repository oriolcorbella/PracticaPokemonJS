import { MAX_POKEMON_ID } from './api/config.js';

// Devuelve un mensaje de error o null si el número de cartas es válido
export function validateCardsNumber(value) {
    const cardsNumber = Number(value);

    if (value.trim() === '' || !Number.isInteger(cardsNumber)) {
        return 'El número de cartas debe ser un número entero.';
    }

    if (cardsNumber <= 0) {
        return 'El número de cartas debe ser positivo.';
    }

    if (cardsNumber % 2 !== 0) {
        return 'El número de cartas debe ser par.';
    }

    if (cardsNumber > MAX_POKEMON_ID * 2) {
        return `El número máximo de cartas es ${MAX_POKEMON_ID * 2}.`;
    }

    return null;
}
