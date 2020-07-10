/*----- constants -----*/
const baseURL = 'https://pokeapi.co/api/v2/pokemon';





/*----- app's state (variables) -----*/
let pokemon, pokemonDets;



/*----- cached element references -----*/
const $ulEl = $('.collection');




/*----- event listeners -----*/
$ulEl.on('click', handleClick)



/*----- functions -----*/
function handleClick(event) {
    console.log(event);
}
// make data available as soon as the app loads
getPokemon();

function getPokemon() {
    $.ajax(baseURL)
        .then(function(data) {
                pokemon = data.results;
            },
            function(error) {
                console.log('error', error);
            });
}