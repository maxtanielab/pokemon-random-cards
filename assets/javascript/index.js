import pokemonCards from "./pokemonCards.js";

$(async function () {
	let res = await getPokemons("https://pokeapi-enoki.netlify.app/pokeapi.json");
	let pokemons = res.pokemons;

	let cards = $("#pokemon-random-cards");
	let abilitiesContentOutput = "";
	let cardActive = false;
	let currentImageIndex = getRandomNumber(pokemons.length);

	//Initial random card
	pokemonCards(pokemons[currentImageIndex], abilitiesContentOutput, cards);

	let spanTimer = $("#span-timer");
	let stopBtn = $("#stop-btn");
	$(stopBtn).prop("disabled", true);
	let startBtn = $("#start-btn");

	let usedImageIndexes = [];
	let lastFilledImageNumber = 0;
	let intervalHandle = null;
	let timeoutHandle = null;

	//Start btn onclick
	$(startBtn).on("click", function () {
		let counter = 15;
		currentImageIndex = getRandomNumber(pokemons.length);

		//pokemonRandomCard
		pokemonCards(pokemons[currentImageIndex], abilitiesContentOutput, cards);

		$(stopBtn).prop("disabled", false);

		clearInterval(intervalHandle);
		clearTimeout(timeoutHandle);

		intervalHandle = setInterval(function () {
			currentImageIndex = getRandomNumber(pokemons.length);

			pokemonCards(pokemons[currentImageIndex], abilitiesContentOutput, cards);

			$(spanTimer).text(`${counter--} (s)`);
		}, 1000);

		timeoutHandle = setTimeout(function () {
			handleImageChange();
			console.log(pokemons[currentImageIndex]);
		}, counter * 1000);
	});

	//Stop btn onclick
	$(stopBtn).on("click", function () {
		handleImageChange();

		console.log(pokemons[currentImageIndex]);

		$(cards).on("click", function () {
			cardActive = true;
			cardActive ? $(this).addClass("active") : console.log(cardActive);
			console.log(usedImageIndexes.length);
			let selectData = $(
				`.empty-cards-content[data-id="${usedImageIndexes.length}"] .cards`
			);

			pokemonCards(
				pokemons[currentImageIndex],
				abilitiesContentOutput,
				selectData
			);
		});
	});

	//Handle image change
	function handleImageChange() {
		$(stopBtn).prop("disabled", true);
		$(spanTimer).text("");

		clearInterval(intervalHandle);
		clearTimeout(timeoutHandle);

		if (usedImageIndexes.includes(currentImageIndex)) {
			alert("image est déjà dans la sélection !");
		} else {
			usedImageIndexes.push(currentImageIndex);
			console.log("USED", usedImageIndexes);
			$("#image" + ++lastFilledImageNumber).attr(
				"src",
				pokemons[currentImageIndex].image
			);
		}

		if (lastFilledImageNumber === 6) {
			$(startBtn).text("C'est fini !");
			$(startBtn).prop("disabled", true);
		}
	}

	//Fetch and return pokemon API
	async function getPokemons(url) {
		let body = await fetch(url);
		let pokemons = await body.json();
		return pokemons;
	}

	//Get random number
	function getRandomNumber(max) {
		return Math.floor(Math.random() * max);
	}
});
