// pokemon api

// https://pokeapi.co/api/v2/{endpoint}/
const URL = 'https://pokeapi.co/api/v2/pokemon/'

const search = document.getElementById('search')
const card = document.getElementById('card');
let sprites;

async function fetchPokemon() {
    let searchValue = search.value.toLowerCase();

    if (searchValue === "") searchValue = 'bulbasaur'

    try {
        const response = await fetch(URL + searchValue)

        if (!response.ok) {
            alert('Pokemon not found! Check your spelling')
            throw new Error('Pokemon Not Found!')
        }
        const data = await response.json();
        // name, types, sprites.front_shiny

        const pokemonObj = {
            name: data.name,
            types: data.types.map(t => t.type.name).join(", "),
            sprites: data.sprites,
            cries: data.cries.latest,
            stats: data.stats,
            moves: data.moves,
            pokedexNumber: data.id
        }
        sprites = data.sprites;
        renderCard(pokemonObj)
        colorName(pokemonObj)

        console.log("pokemon", pokemonObj)
    } catch (error) {
        console.log(error.message)
    }
}

function renderCard({name, types, sprites, cries, stats, moves, pokedexNumber}) {

    const baseStats = stats.map(stat => {
        return `<p>${stat.stat.name}: ${stat.base_stat}</p>`
    }).join("")

    const randomMove = moves[Math.floor(Math.random() * moves.length)].move.name

    card.innerHTML = `
        <h3>No. ${pokedexNumber}</h3>
        <h1 id='pokemon-name'>${name}</h1>
        <p>Favorite move: ${randomMove}</p>
        <img id='search-image' src="${sprites.front_shiny}" alt="${name}"/>
        <audio id='pokemon-cry' controls src='${cries}'></audio>
        <p>Types: ${types}</p>
        <p>base stats:</p>
        ${baseStats}
        `
}

function colorName({types}) {
    const colorTypes = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const ourType = types.split(',')[0];
    const style = document.getElementById('style')

    Object.entries(colorTypes).forEach(([key, val]) => {
        if (key === ourType) {
            style.append(`#pokemon-name {
                color: ${val}
                }`)
        }
    })
}
