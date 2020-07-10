/*----- constants -----*/
const baseURL = 'https://pokeapi.co/api/v2/pokemon';





/*----- app's state (variables) -----*/
let pokemon, pokemonDets;



/*----- cached element references -----*/
const $ulEl = $('.collection');
const $imgEl = $('.modal-content img');
const $name = $('#name');
const $moves = $('#moves');
const $abilities = $('#abilities');
const $height = $('#height');
const $modal = $('.modal');



/*----- event listeners -----*/
$ulEl.on('click', 'span', handleClick);



/*----- functions -----*/
$modal.modal();
const instance = M.Modal.getInstance($modal);

function handleClick(event) {
    getPokemon(event.target.dataset.url, true);
}
// make data available as soon as the app loads
getPokemon();

function getPokemon(detailURL, isDetail) {
    const url = detailURL || baseURL;
    $.ajax(url)
        .then(function(data) {
                if (!isDetail) {
                    pokemon = data.results;
                    render(); // programmatically render the html
                } else {
                    pokemonDets = data;
                    render(true);

                };
            },
            function(error) {
                console.log('error:', error);
            });
}

function generateHTML() {
    return pokemon.map(function(p) {
        return `<li class="collection-item red-text">
        <div style='text-transform: capitalize'>${p.name}<span data-url="${p.url}" class="secondary-content blue-text">Detail</span></div>
    </li>`;
    });
}

function render(isDetail) {
    if (!isDetail) {
        const html = generateHTML().join('');
        $ulEl.html(html);

    } else {
        //  produce the modal
        $imgEl.attr('src', pokemonDets.sprites.front_default);
        $imgEl.attr('alt', pokemonDets.name);
        $name.text(pokemonDets.name);
        $height.text('Height: ' + pokemonDets.height);
        $moves.text('Number of moves: ' + pokemonDets.moves.length);
        $abilities.text('Number of abilities: ' + pokemonDets.abilities.length);
        // open the modal
        instance.open();
    }
}