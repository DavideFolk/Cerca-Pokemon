'use strict';
function pokemonRender(pokemon) {
	axios
		.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
		.then(function (response) {
			$('#card').addClass('hidden');
			$('#cardFail').addClass('hidden');
			let nome = response.data.forms[0].name;
			let nomeCorretto = nome.at(0).toUpperCase() + nome.slice(1);
			let numero = response.data.id;
			let tipo = response.data.types[0].type.name;
			let altezza = response.data.height * 10;
			let linkImmagine =
				response.data.sprites.other['official-artwork'].front_default;
			let peso = response.data.weight / 10;
			$('#loader').removeClass('hidden');
			setTimeout(() => {
				$('#loader').addClass('hidden');
				$('#card').removeClass('hidden');
			}, 600);
			$('#nome').text(nomeCorretto);
			$('#numero').text(`n. ${numero}`);
			$('#tipo').text(`Tipo: ${tipo}`);
			$('#altezza').text(`Altezza: ${altezza} cm`);
			$('#immagine').prop('src', linkImmagine);
			$('#peso').text(`Peso: ${peso} kg`);
		})
		.catch(function (e) {
			$('#card').addClass('hidden');
			$('#cardFail').addClass('hidden');
			$('#loader').removeClass('hidden');
			setTimeout(() => {
				$('#loader').addClass('hidden');
				$('#cardFail').removeClass('hidden');
			}, 600);
		});

	axios
		.get('https://pokeapi.co/api/v2/pokemon-species/' + pokemon)
		.then(function (response) {
			let testo = response.data.flavor_text_entries;
			//$('#testo').text(testo);
			for (const k in testo) {
				if (testo[k].language.name == 'it') {
					$('#testo').text(testo[k].flavor_text);
					break;
				}
			}
		})
		.catch(function (e) {
			console.log('errore', e);
		});
}

$('#button-addon2').click('submit', function (e) {
	e.preventDefault();
	let pokemon = $('#pkmSearch').val();
	pokemonRender(pokemon);
});

$('#button-random').click((e) => {
	e.preventDefault();
	let nPokemon = Math.floor(Math.random() * 905 + 1);
	pokemonRender(nPokemon);
});
