const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonimage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPookemon = 1;

const fetchPokemon = async (pokemon ) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status ==200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML ='Loading...';
    pokemonNumber.innerHTML ='';

    const data = await fetchPokemon(pokemon);
    
    if (data) {
    pokemonimage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonimage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPookemon = data.id;
    } else {
        pokemonimage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
        if (searchPookemon > 1) {
            searchPookemon -= 1;
            renderPokemon(searchPookemon);
        }
});

buttonNext.addEventListener('click', () => {
    searchPookemon += 1;
    renderPokemon(searchPookemon);
});

renderPokemon(searchPookemon);


//tentar por uma pokebola no caso de nao encontrado, mesma imagem do inicio