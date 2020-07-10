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
                render(); // programmatically render the html
            },
            function(error) {
                console.log('error', error);
            });
}

function generateHTML() {
    return pokemon.map(function(p) {
        return `<li class="collection-item red-text">
        <div style='text-transform: capitalize'>${p.name}<span data-url="${p.url}" class="secondary-content blue-text">Detail</span></div>
    </li>`;
    });
}

function render() {
    const html = generateHTML().join('');
    $ulEl.html(html);
}