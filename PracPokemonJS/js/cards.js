// Devuelve "amount" ids de pokemon distintos entre 1 y maxId
export function getRandomPokemonIds(amount, maxId) {
    const ids = new Set();

    while (ids.size < amount) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        ids.add(randomId);
    }

    return [...ids];
}

// Algoritmo de Fisher-Yates sobre una copia del array
export function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export function createCard(pokemonId, imageUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pokemonId;
    card.dataset.image = imageUrl;
    return card;
}

export function showCard(card) {
    card.classList.add('flipped');
    card.style.backgroundImage = `url("${card.dataset.image}")`;
}

export function hideCard(card) {
    card.classList.remove('flipped');
    card.style.backgroundImage = '';
}

export function markAsMatched(card) {
    card.classList.add('matched');
}
