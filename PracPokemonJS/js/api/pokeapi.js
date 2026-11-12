const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonImage(pokemonId) {
    const response = await fetch(`${POKEAPI_URL}/${pokemonId}`);

    if (!response.ok) {
        throw new Error(`No se ha podido cargar el pokemon ${pokemonId}`);
    }

    const pokemon = await response.json();
    return pokemon.sprites.front_default;
}
