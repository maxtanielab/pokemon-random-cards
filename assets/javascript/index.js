
import pokemonRandomCard from "./pokemonRandomCard.js";
import pokemonCards from "./pokemonCards.js";

$(async function () {
  let res = await getPokemons("https://pokeapi-enoki.netlify.app/pokeapi.json");
  let pokemons = res.pokemons;

  /* Get the main pokemon card */
  let cards = $("#card");
  let mainImage = $("#main-image");
  let mainName = $("#name");
  let mainLevel = $("#level");
  let mainAbilities = $("#abilities");

  let counterSelectCard = 0;
  // let counterStartClick = 0;
  let counterStopClick = 0;
  let cardActive = false;

  let currentImageIndex = getRandomNumber(pokemons.length);
  let abilitiesContentOutput = "";

  pokemonRandomCard(
    pokemons[currentImageIndex],
    abilitiesContentOutput,
    mainAbilities,
    cards,
    mainImage,
    mainName,
    mainLevel
  );

  let spanTimer = $("#span-timer");

  let stopBtn = $("#stop-btn");
  $(stopBtn).prop("disabled", true);

  let startBtn = $("#start-btn");

  let usedImageIndexes = [];
  let lastFilledImageNumber = 0;
  let intervalHandle = null;
  let timeoutHandle = null;

  $(startBtn).on("click", function () {
    let counter = 15;
    currentImageIndex = getRandomNumber(pokemons.length);

    // $(cards).removeClass("hide-card");

    //pokemonRandomCard
    pokemonRandomCard(
      pokemons[currentImageIndex],
      abilitiesContentOutput,
      mainAbilities,
      cards,
      mainImage,
      mainName,
      mainLevel
    );

    $(stopBtn).prop("disabled", false);

    clearInterval(intervalHandle);
    clearTimeout(timeoutHandle);

    intervalHandle = setInterval(function () {
      currentImageIndex = getRandomNumber(pokemons.length);

      pokemonRandomCard(
        pokemons[currentImageIndex],
        abilitiesContentOutput,
        mainAbilities,
        cards,
        mainImage,
        mainName,
        mainLevel
      );

      $(spanTimer).text(`${counter--} (s)`);
    }, 1000);

    timeoutHandle = setTimeout(function () {
      handleImageChange();
      console.log(pokemons[currentImageIndex]);
    }, counter * 1000);
  });

  $(stopBtn).on("click", function () {
    handleImageChange();
    counterSelectCard++;

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

      // $(".empty-cards .cards").map((el, index) => {
      //   return console.log($(".empty-cards .cards").hasClass("is-actived"));
      // });
    });

    cardActive ? $(this).addClass("active") : console.log(cardActive);
  });

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

  async function getPokemons(url) {
    let body = await fetch(url);
    let pokemons = await body.json();
    return pokemons;
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
});
